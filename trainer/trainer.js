/* MSK Dictation Trainer — engine */
(function () {
  "use strict";
  var QS = (window.TRAINER_QUESTIONS || []);
  var $ = function (id) { return document.getElementById(id); };
  var LVL_XP = 120; // XP per level

  // ---------- persistence ----------
  var store = {
    get xp() { return +localStorage.getItem("mskt-xp") || 0; },
    set xp(v) { localStorage.setItem("mskt-xp", v); },
    get streak() { return +localStorage.getItem("mskt-streak") || 0; },
    set streak(v) { localStorage.setItem("mskt-streak", v); },
    get best() { return +localStorage.getItem("mskt-best") || 0; },
    set best(v) { localStorage.setItem("mskt-best", v); },
    results: JSON.parse(localStorage.getItem("mskt-results") || "{}"),
    saveResults: function () { localStorage.setItem("mskt-results", JSON.stringify(this.results)); }
  };

  // ---------- state ----------
  var sel = { mode: "dictate", joint: "all", diff: 0 };
  var session = { queue: [], i: 0, correct: 0, totalCov: 0, answered: 0, xpStart: 0 };

  // ---------- helpers ----------
  function levelOf(xp) { return 1 + Math.floor(xp / LVL_XP); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function rx(p) { try { return new RegExp(p, "i"); } catch (e) { return null; } }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function toast(msg) { var t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("show"); }, 1900); }

  function updateHUD(gain) {
    var xp = store.xp;
    $("lvl").textContent = "Lv " + levelOf(xp);
    var into = xp % LVL_XP;
    $("xpfill").style.width = (into / LVL_XP * 100) + "%";
    $("xptext").textContent = xp + " XP";
    $("streak").textContent = store.streak;
  }

  function addXP(n, passed) {
    var beforeLvl = levelOf(store.xp);
    store.xp += n;
    if (passed) { store.streak += 1; if (store.streak > store.best) store.best = store.streak; }
    else { store.streak = 0; }
    var afterLvl = levelOf(store.xp);
    updateHUD();
    if (afterLvl > beforeLvl) setTimeout(function () { toast("⬆️ Level " + afterLvl + "!"); }, 250);
  }

  function recordResult(q, passed) {
    var r = store.results[q.id] || { seen: 0, pass: false };
    r.seen += 1; r.pass = passed; store.results[q.id] = r; store.saveResults();
  }

  // ---------- build start screen ----------
  function joints() {
    var set = {}; QS.forEach(function (q) { set[q.joint] = (set[q.joint] || 0) + 1; });
    var order = ["all", "general", "shoulder", "knee", "hip", "ankle", "foot", "elbow", "wrist", "hand"];
    var names = { all: "All", general: "Core lexicon", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand/Finger" };
    var html = "";
    order.forEach(function (j) {
      if (j !== "all" && !set[j]) return;
      html += '<button class="chip' + (j === "all" ? " sel" : "") + '" data-joint="' + j + '">' + names[j] + "</button>";
    });
    $("joints").innerHTML = html;
  }

  function filtered() {
    return QS.filter(function (q) {
      if (sel.joint !== "all" && q.joint !== sel.joint) return false;
      if (sel.diff && (q.difficulty || 1) !== sel.diff) return false;
      return true;
    });
  }

  function poolForMode() {
    var pool = filtered();
    if (sel.mode === "dictate") return pool.filter(function (q) { return q.type === "dictate"; });
    if (sel.mode === "mcq") return pool.filter(function (q) { return q.type === "mcq"; });
    if (sel.mode === "cloze") return pool.filter(function (q) { return q.type === "cloze"; });
    if (sel.mode === "lightning") return pool.filter(function (q) { return q.type === "mcq" || q.type === "cloze"; });
    if (sel.mode === "review") {
      return pool.filter(function (q) { var r = store.results[q.id]; return r && r.pass === false; });
    }
    return pool; // mixed
  }

  function refreshCount() {
    var n = poolForMode().length;
    var btn = $("startbtn"), note = $("countnote");
    if (n === 0) {
      btn.disabled = true;
      note.textContent = sel.mode === "review" ? "No misses to review yet — go practice!" : "No questions match these filters.";
    } else {
      btn.disabled = false;
      var len = sel.mode === "lightning" ? Math.min(10, n) : Math.min(12, n);
      note.textContent = len + " question" + (len > 1 ? "s" : "") + " this session  ·  " + n + " available";
    }
  }

  // ---------- session ----------
  function startSession() {
    var pool = shuffle(poolForMode());
    // prioritise unseen questions
    pool.sort(function (a, b) { return ((store.results[a.id] ? 1 : 0) - (store.results[b.id] ? 1 : 0)); });
    var len = sel.mode === "lightning" ? 10 : 12;
    session = { queue: pool.slice(0, Math.min(len, pool.length)), i: 0, correct: 0, totalCov: 0, answered: 0, xpStart: store.xp };
    $("start").classList.add("hidden");
    $("summary").classList.add("hidden");
    $("quiz").classList.remove("hidden");
    renderQuestion();
  }

  function renderQuestion() {
    var q = session.queue[session.i];
    $("qfeedback").innerHTML = "";
    var jn = { general: "Core", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand" };
    $("qjoint").textContent = jn[q.joint] || q.joint;
    $("qtopic").textContent = q.topic || "";
    $("qdiff").textContent = ["", "Easy", "Medium", "Hard"][q.difficulty || 1];
    $("qprog").textContent = (session.i + 1) + " / " + session.queue.length;
    $("qprogfill").style.width = (session.i / session.queue.length * 100) + "%";
    var tl = { dictate: "Dictate It", mcq: "Term Match", cloze: "Fill the Blank" }[q.type];
    var te = $("qtypelabel"); te.textContent = tl; te.className = "qtype " + q.type;
    $("qprompt").textContent = q.prompt;

    var qi = $("qinput"), qa = $("qactions");
    if (q.type === "dictate") {
      qi.innerHTML = '<textarea id="ans" placeholder="Type your findings the way you would dictate them…" autocapitalize="sentences"></textarea>';
      qa.innerHTML = '<button class="btn primary" id="submit">Score my dictation</button><button class="btn ghost" id="reveal">Skip</button>';
      $("submit").onclick = function () { gradeDictate(q); };
      $("reveal").onclick = function () { gradeDictate(q, true); };
      $("ans").focus();
    } else if (q.type === "mcq") {
      var ch = "";
      q.choices.forEach(function (c, idx) { ch += '<button class="choice" data-i="' + idx + '"><span class="k">' + "ABCD".charAt(idx) + '</span><span>' + esc(c) + "</span></button>"; });
      qi.innerHTML = '<div class="choices">' + ch + "</div>";
      qa.innerHTML = "";
      Array.prototype.forEach.call(qi.querySelectorAll(".choice"), function (b) { b.onclick = function () { gradeMCQ(q, +b.getAttribute("data-i")); }; });
    } else { // cloze
      qi.innerHTML = '<input class="clozein" id="ans" placeholder="Type the missing term…" autocapitalize="none">';
      qa.innerHTML = '<button class="btn primary" id="submit">Check</button><button class="btn ghost" id="reveal">Skip</button>';
      $("submit").onclick = function () { gradeCloze(q); };
      $("reveal").onclick = function () { gradeCloze(q, true); };
      $("ans").addEventListener("keydown", function (e) { if (e.key === "Enter") gradeCloze(q); });
      $("ans").focus();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- highlight model answer ----------
  function highlightModel(model, keyterms, hitLabels) {
    var ranges = [];
    keyterms.forEach(function (kt) {
      for (var p = 0; p < kt.patterns.length; p++) {
        var re = rx(kt.patterns[p]); if (!re) continue;
        var m = re.exec(model);
        if (m && m[0]) { ranges.push({ s: m.index, e: m.index + m[0].length, hit: hitLabels[kt.label] }); break; }
      }
    });
    ranges.sort(function (a, b) { return a.s - b.s; });
    var out = "", pos = 0, lastEnd = -1;
    ranges.forEach(function (r) {
      if (r.s < lastEnd) return; // skip overlap
      out += esc(model.slice(pos, r.s));
      out += '<mark class="' + (r.hit ? "hit" : "miss") + '">' + esc(model.slice(r.s, r.e)) + "</mark>";
      pos = r.e; lastEnd = r.e;
    });
    out += esc(model.slice(pos));
    return out;
  }

  // ---------- grading ----------
  function band(cov) {
    if (cov >= 0.85) return { cls: "expert", lbl: "Expert", xp: 12 };
    if (cov >= 0.6) return { cls: "good", lbl: "Solid", xp: 8 };
    if (cov >= 0.35) return { cls: "mid", lbl: "Getting there", xp: 5 };
    return { cls: "low", lbl: "Keep studying", xp: 2 };
  }

  function gradeDictate(q, skipped) {
    var txt = skipped ? "" : ($("ans") ? $("ans").value : "");
    var hits = [], misses = [], hitLabels = {};
    q.keyterms.forEach(function (kt) {
      var matched = !skipped && kt.patterns.some(function (p) { var r = rx(p); return r && r.test(txt); });
      if (matched) { hits.push(kt); hitLabels[kt.label] = true; } else { misses.push(kt); }
    });
    var cov = q.keyterms.length ? hits.length / q.keyterms.length : 0;
    var b = band(cov);
    var diff = q.difficulty || 1;
    var gain = skipped ? 0 : Math.max(1, Math.round(b.xp * (0.7 + 0.3 * diff)));
    var passed = cov >= 0.6 && !skipped;

    var html = "";
    html += '<div class="scoreband ' + (skipped ? "mid" : b.cls) + '">';
    html += '<div class="big">' + Math.round(cov * 100) + "%</div>";
    html += '<div><div class="lbl">' + (skipped ? "Revealed" : b.lbl) + '</div><div class="sub">' + hits.length + " of " + q.keyterms.length + " expert terms</div></div>";
    if (gain) html += '<div class="xpgain">+' + gain + " XP</div>";
    html += "</div>";

    html += '<div class="terms">';
    hits.forEach(function (kt) { html += '<div class="term hit"><span class="mk">✓</span><div><div class="tl">' + esc(kt.label) + "</div></div></div>"; });
    misses.forEach(function (kt) { html += '<div class="term miss"><span class="mk">✗</span><div><div class="tl">' + esc(kt.label) + '</div><div class="wy">' + esc(kt.why) + "</div></div></div>"; });
    html += "</div>";

    html += '<div class="modelbox"><h4>Model dictation (your hits in green, misses in amber)</h4>' + highlightModel(q.model, q.keyterms, hitLabels) + "</div>";

    $("qfeedback").innerHTML = html;
    finishQuestion(gain, passed, cov);
  }

  function gradeMCQ(q, choice) {
    var correct = choice === q.answer;
    Array.prototype.forEach.call($("qinput").querySelectorAll(".choice"), function (b, idx) {
      b.onclick = null;
      if (idx === q.answer) b.classList.add("correct");
      else if (idx === choice) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    var diff = q.difficulty || 1;
    var gain = correct ? Math.round((sel.mode === "lightning" ? 5 : 6) * (0.7 + 0.3 * diff)) : 0;
    var html = '<div class="scoreband ' + (correct ? "expert" : "low") + '"><div class="big">' + (correct ? "✓" : "✗") + '</div><div><div class="lbl">' + (correct ? "Correct" : "Not quite") + "</div></div>" + (gain ? '<div class="xpgain">+' + gain + " XP</div>" : "") + "</div>";
    html += '<div class="explain">' + esc(q.explain) + "</div>";
    $("qfeedback").innerHTML = html;
    finishQuestion(gain, correct, correct ? 1 : 0);
  }

  function gradeCloze(q, skipped) {
    var val = skipped ? "" : ($("ans") ? $("ans").value : "");
    var nu = norm(val);
    var correct = !skipped && q.answers.some(function (a) {
      var na = norm(a);
      if (!nu) return false;
      if (nu === na) return true;
      return new RegExp("(^|\\b)" + na.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|\\b)").test(nu);
    });
    var inp = $("ans"); if (inp) { inp.disabled = true; inp.style.borderColor = correct ? "var(--green)" : "var(--red)"; }
    var diff = q.difficulty || 1;
    var gain = correct ? Math.round(6 * (0.7 + 0.3 * diff)) : 0;
    var html = '<div class="scoreband ' + (correct ? "expert" : (skipped ? "mid" : "low")) + '"><div class="big">' + (correct ? "✓" : (skipped ? "—" : "✗")) + '</div><div><div class="lbl">' + (correct ? "Correct" : "Answer: " + esc(q.answers[0])) + "</div></div>" + (gain ? '<div class="xpgain">+' + gain + " XP</div>" : "") + "</div>";
    html += '<div class="explain">' + esc(q.explain) + "</div>";
    $("qfeedback").innerHTML = html;
    finishQuestion(gain, correct, correct ? 1 : 0);
  }
  function norm(s) { return (s || "").toLowerCase().replace(/[.,;:]+$/, "").replace(/\s+/g, " ").trim(); }

  function finishQuestion(gain, passed, cov) {
    var q = session.queue[session.i];
    addXP(gain, passed);
    recordResult(q, passed);
    session.answered += 1; session.totalCov += cov; if (passed) session.correct += 1;
    var last = session.i >= session.queue.length - 1;
    $("qactions").innerHTML = '<button class="btn primary" id="next">' + (last ? "See results" : "Next question →") + "</button>";
    $("next").onclick = function () { if (last) showSummary(); else { session.i += 1; renderQuestion(); } };
    $("next").focus();
  }

  // ---------- summary ----------
  function showSummary() {
    $("quiz").classList.add("hidden");
    var s = $("summary"); s.classList.remove("hidden");
    var pct = session.answered ? Math.round(session.totalCov / session.answered * 100) : 0;
    var xpEarned = store.xp - session.xpStart;
    var em = pct >= 85 ? "🏆" : pct >= 60 ? "💪" : "📚";
    s.innerHTML =
      '<div class="summary"><div class="em">' + em + "</div><h2>Session complete</h2>" +
      '<div class="grid">' +
      '<div class="cell"><div class="n">' + pct + '%</div><div class="l">Avg score</div></div>' +
      '<div class="cell"><div class="n">' + session.correct + "/" + session.answered + '</div><div class="l">Passed</div></div>' +
      '<div class="cell"><div class="n">+' + xpEarned + '</div><div class="l">XP earned</div></div>' +
      '<div class="cell"><div class="n">' + store.streak + '</div><div class="l">Streak 🔥</div></div>' +
      "</div>" +
      '<div class="row"><button class="btn primary" id="again">Another session</button><button class="btn ghost" id="back">Change mode</button></div></div>';
    $("again").onclick = startSession;
    $("back").onclick = function () { s.classList.add("hidden"); $("start").classList.remove("hidden"); refreshCount(); window.scrollTo(0, 0); };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- wire up start screen ----------
  function initStart() {
    joints();
    $("modes").addEventListener("click", function (e) {
      var b = e.target.closest(".mode"); if (!b) return;
      sel.mode = b.getAttribute("data-mode");
      Array.prototype.forEach.call($("modes").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshCount();
    });
    $("joints").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      sel.joint = b.getAttribute("data-joint");
      Array.prototype.forEach.call($("joints").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshCount();
    });
    $("diffs").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      sel.diff = +b.getAttribute("data-diff");
      Array.prototype.forEach.call($("diffs").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshCount();
    });
    $("startbtn").onclick = startSession;
    refreshCount();
    updateHUD();
  }

  if (!QS.length) { document.querySelector("main").innerHTML = '<p style="padding:40px 0;color:#aab4c5">Question bank failed to load.</p>'; }
  else initStart();
})();
