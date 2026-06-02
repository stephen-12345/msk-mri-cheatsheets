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
    get day() { return JSON.parse(localStorage.getItem("mskt-day") || '{"last":"","count":0}'); },
    set day(v) { localStorage.setItem("mskt-day", JSON.stringify(v)); },
    results: JSON.parse(localStorage.getItem("mskt-results") || "{}"),
    saveResults: function () { localStorage.setItem("mskt-results", JSON.stringify(this.results)); }
  };

  function todayStr() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function yesterdayStr() { var d = new Date(Date.now() - 864e5); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function rollDailyStreak() {
    var d = store.day, t = todayStr();
    if (d.last === t) return d.count;            // already counted today
    d.count = (d.last === yesterdayStr()) ? (d.count + 1) : 1;
    d.last = t; store.day = d; return d.count;
  }

  // ---------- state ----------
  var sel = { mode: "dictate", joint: "all", diff: 0, size: "auto", time: 0 };
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
    $("streak").textContent = store.day.count || 0;
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

  // ---------- SM-2 spaced repetition ----------
  var DAY = 864e5;
  function todayMid() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function recordResult(q, passed, quality) {
    var r = store.results[q.id] || { seen: 0, pass: false, ef: 2.5, reps: 0, interval: 0 };
    r.seen += 1; r.pass = passed;
    if (r.ef == null) r.ef = 2.5;
    if (quality < 3) {            // lapse → relearn tomorrow
      r.reps = 0; r.interval = 1;
    } else {
      r.reps = (r.reps || 0) + 1;
      r.interval = r.reps === 1 ? 1 : r.reps === 2 ? 6 : Math.round((r.interval || 1) * r.ef);
    }
    r.ef = Math.max(1.3, r.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    r.due = todayMid() + r.interval * DAY;     // due at the start of the target day
    r.q = quality;
    store.results[q.id] = r; store.saveResults();
  }
  // a card is "due" if scheduled on/before today, or a legacy miss with no schedule yet
  function isDue(r) { return !!r && ((r.due && r.due <= todayMid()) || (r.pass === false && r.due == null)); }
  function dueCount() { var n = 0; QS.forEach(function (q) { if (isDue(store.results[q.id])) n++; }); return n; }
  function newCount() { var n = 0; QS.forEach(function (q) { if (!store.results[q.id]) n++; }); return n; }

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
    if (sel.mode === "srs") {
      var due = pool.filter(function (q) { return isDue(store.results[q.id]); });
      due.sort(function (a, b) { return (store.results[a.id].due || 0) - (store.results[b.id].due || 0); });
      var fresh = pool.filter(function (q) { return !store.results[q.id]; });
      return due.concat(fresh);   // due (most overdue first), then new cards to fill
    }
    return pool; // mixed, exam
  }
  var EXAM_LEN = 15, EXAM_SECONDS = 12 * 60;

  function sessionLen(n) {
    if (sel.mode === "exam") return Math.min(EXAM_LEN, n);   // exam is a fixed format
    if (sel.size === "all") return n;
    if (typeof sel.size === "number") return Math.min(sel.size, n);
    // "auto" — per-mode defaults
    if (sel.mode === "lightning") return Math.min(10, n);
    if (sel.mode === "srs") return Math.min(20, n);
    return Math.min(12, n);
  }
  function refreshCount() {
    var n = poolForMode().length;
    var btn = $("startbtn"), note = $("countnote");
    if (n === 0) {
      btn.disabled = true;
      note.textContent = "No questions match these filters.";
    } else {
      btn.disabled = false;
      var len = sessionLen(n);
      var extra = sel.mode === "exam" ? "  ·  12-min timed exam, graded"
        : sel.mode === "srs" ? ("  ·  " + dueCount() + " due, " + newCount() + " new available")
        : (sel.time > 0 ? ("  ·  " + sel.time + "-min limit") : "");
      note.textContent = len + " question" + (len > 1 ? "s" : "") + " this session  ·  " + n + " available" + extra;
    }
  }
  function updateDueBanner() {
    var b = $("duebanner"); if (!b) return;
    var due = dueCount();
    if (due > 0) {
      b.innerHTML = "🗓 <b>" + due + "</b> card" + (due > 1 ? "s" : "") + " due for review today — tap to start";
      b.classList.add("active"); b.style.display = "";
    } else {
      b.innerHTML = "✓ All caught up on reviews — practice freely or learn new cards";
      b.classList.remove("active"); b.style.display = "";
    }
  }

  // ---------- session ----------
  var examTimer = null;
  function startSession() {
    rollDailyStreak(); updateHUD();
    var pool = shuffle(poolForMode());
    // prioritise unseen questions
    pool.sort(function (a, b) { return ((store.results[a.id] ? 1 : 0) - (store.results[b.id] ? 1 : 0)); });
    var len = sessionLen(pool.length);
    var exam = sel.mode === "exam";
    var timed = exam || sel.time > 0;
    session = { queue: pool.slice(0, len), i: 0, correct: 0, totalCov: 0, answered: 0, xpStart: store.xp, exam: exam, timed: timed };
    $("start").classList.add("hidden");
    $("summary").classList.add("hidden");
    $("quiz").classList.remove("hidden");
    if (examTimer) { clearInterval(examTimer); examTimer = null; }
    if (timed) {
      session.endAt = Date.now() + (exam ? EXAM_SECONDS : sel.time * 60) * 1000;
      examTimer = setInterval(tickTimer, 1000);
    }
    renderQuestion();
  }
  function tickTimer() {
    var left = Math.max(0, Math.round((session.endAt - Date.now()) / 1000));
    var el = $("examtime");
    if (el) {
      var m = Math.floor(left / 60), s = left % 60;
      el.textContent = "⏱ " + m + ":" + (s < 10 ? "0" : "") + s;
      el.style.color = left <= 60 ? "#e2737a" : "var(--amber)";
    }
    if (left <= 0) { clearInterval(examTimer); examTimer = null; showSummary(); }
  }

  function renderQuestion() {
    var q = session.queue[session.i];
    $("qfeedback").innerHTML = "";
    var jn = { general: "Core", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand" };
    $("qjoint").textContent = jn[q.joint] || q.joint;
    $("qtopic").textContent = q.topic || "";
    $("qdiff").textContent = ["", "Easy", "Medium", "Hard"][q.difficulty || 1];
    $("qprog").innerHTML = (session.i + 1) + " / " + session.queue.length +
      (session.timed ? ' &nbsp; <span id="examtime" style="font-weight:700">⏱ --:--</span>' : "");
    if (session.timed) tickTimer();
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

  function qualityOf(q, cov, passed) {
    if (q.type === "dictate") return cov >= 0.85 ? 5 : cov >= 0.65 ? 4 : cov >= 0.4 ? 3 : cov >= 0.2 ? 2 : 1;
    return passed ? 5 : 1;     // mcq / cloze
  }
  function finishQuestion(gain, passed, cov) {
    var q = session.queue[session.i];
    addXP(gain, passed);
    recordResult(q, passed, qualityOf(q, cov, passed));
    session.answered += 1; session.totalCov += cov; if (passed) session.correct += 1;
    var last = session.i >= session.queue.length - 1;
    $("qactions").innerHTML = '<button class="btn primary" id="next">' + (last ? "See results" : "Next question →") + "</button>";
    $("next").onclick = function () { if (last) showSummary(); else { session.i += 1; renderQuestion(); } };
    $("next").focus();
  }

  // ---------- summary ----------
  function gradeLetter(p) { return p >= 90 ? "A" : p >= 80 ? "B" : p >= 70 ? "C" : p >= 60 ? "D" : "F"; }
  function showSummary() {
    if (examTimer) { clearInterval(examTimer); examTimer = null; }
    $("quiz").classList.add("hidden");
    var s = $("summary"); s.classList.remove("hidden");
    var pct = session.answered ? Math.round(session.totalCov / session.answered * 100) : 0;
    var xpEarned = store.xp - session.xpStart;
    var em = session.exam ? "🎓" : pct >= 85 ? "🏆" : pct >= 60 ? "💪" : "📚";
    var heading = session.exam ? ("Exam grade: " + gradeLetter(pct)) : "Session complete";
    s.innerHTML =
      '<div class="summary"><div class="em">' + em + "</div><h2>" + heading + "</h2>" +
      '<div class="grid">' +
      '<div class="cell"><div class="n">' + pct + '%</div><div class="l">Avg score</div></div>' +
      '<div class="cell"><div class="n">' + session.correct + "/" + session.answered + '</div><div class="l">Passed</div></div>' +
      '<div class="cell"><div class="n">+' + xpEarned + '</div><div class="l">XP earned</div></div>' +
      '<div class="cell"><div class="n">' + store.streak + '</div><div class="l">Streak 🔥</div></div>' +
      "</div>" +
      '<div class="row"><button class="btn primary" id="again">Another session</button><button class="btn ghost" id="back">Change mode</button></div></div>';
    $("again").onclick = startSession;
    $("back").onclick = function () { s.classList.add("hidden"); $("start").classList.remove("hidden"); refreshCount(); updateDueBanner(); window.scrollTo(0, 0); };
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
    $("sizes").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      var v = b.getAttribute("data-size");
      sel.size = (v === "auto" || v === "all") ? v : +v;
      Array.prototype.forEach.call($("sizes").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshCount();
    });
    $("times").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      sel.time = +b.getAttribute("data-time");
      Array.prototype.forEach.call($("times").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshCount();
    });
    $("startbtn").onclick = startSession;
    var dueb = $("duebanner");
    if (dueb) dueb.onclick = function () {
      if (dueCount() === 0 && newCount() === 0) return;
      sel.mode = "srs";
      Array.prototype.forEach.call($("modes").children, function (x) { x.classList.toggle("sel", x.getAttribute("data-mode") === "srs"); });
      startSession();
    };
    window.addEventListener("msk-synced", function () { updateHUD(); updateDueBanner(); });
    refreshCount();
    updateHUD();
    updateDueBanner();
  }

  if (!QS.length) { document.querySelector("main").innerHTML = '<p style="padding:40px 0;color:#aab4c5">Question bank failed to load.</p>'; }
  else initStart();
})();
