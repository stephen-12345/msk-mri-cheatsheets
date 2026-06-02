/* Diagnose It — read the findings, pick the diagnosis. Built from the describe-deck. */
(function () {
  "use strict";
  var FC = (window.FLASHCARDS || []).filter(function (c) { return c.find && c.impr; });
  var $ = function (id) { return document.getElementById(id); };
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function norm(s) { return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function ph(t) { return esc(t).replace(/\[([^\]]+)\]/g, '<span style="color:#e8c39a">[$1]</span>'); }

  var NAMES = { all: "All", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand", spine: "Spine", tumor: "Tumor", general: "Core" };
  var ORDER = ["shoulder", "knee", "hip", "ankle", "foot", "elbow", "wrist", "hand", "spine", "tumor", "general"];

  function stats() { try { return JSON.parse(localStorage.getItem("mskt-dx") || '{"best":0,"n":0,"correct":0}'); } catch (e) { return { best: 0, n: 0, correct: 0 }; } }
  function saveStats(s) { localStorage.setItem("mskt-dx", JSON.stringify(s)); }

  var sel = { topic: "all", size: 15 };
  var sess = null, tickT = null;
  function pool() { return FC.filter(function (c) { return sel.topic === "all" || c.joint === sel.topic; }); }

  function topicChips() {
    var set = {}; FC.forEach(function (c) { set[c.joint] = 1; });
    var order = ["all"].concat(ORDER);
    $("topics").innerHTML = order.filter(function (j) { return j === "all" || set[j]; })
      .map(function (j) { return '<button class="chip' + (j === "all" ? " sel" : "") + '" data-topic="' + j + '">' + (NAMES[j] || j) + "</button>"; }).join("");
  }
  function refreshStart() {
    var n = pool().length;
    $("startbtn").disabled = n < 4;
    $("countnote").textContent = n < 4 ? "Not enough cards in this region — pick another." : (Math.min(sel.size, n) + " questions · " + n + " in pool");
  }
  function hud() { var s = stats(); var acc = s.n ? Math.round(s.correct / s.n * 100) : 0; $("hudmeta").innerHTML = "🏆 <b>" + s.best + "</b> best · " + acc + "% all-time"; }

  function buildQueue() {
    var p = shuffle(pool());
    var n = Math.min(sel.size, p.length);
    return p.slice(0, n).map(function (card) {
      // distractors: prefer same joint, fall back to any; unique impr text
      var used = {}; used[norm(card.impr)] = 1;
      var same = shuffle(FC.filter(function (c) { return c.joint === card.joint && !used[norm(c.impr)]; }));
      var any = shuffle(FC.filter(function (c) { return !used[norm(c.impr)]; }));
      var distract = [];
      [same, any].forEach(function (list) {
        list.forEach(function (c) { var k = norm(c.impr); if (distract.length < 3 && !used[k]) { used[k] = 1; distract.push(c.impr); } });
      });
      var opts = shuffle([card.impr].concat(distract));
      return { card: card, opts: opts, answer: opts.indexOf(card.impr) };
    });
  }

  function start() {
    sess = { queue: buildQueue(), i: 0, correct: 0, t0: Date.now() };
    if (!sess.queue.length) return;
    $("start").classList.add("hidden"); $("summary").classList.add("hidden"); $("quiz").classList.remove("hidden");
    if (tickT) clearInterval(tickT);
    tickT = setInterval(tick, 1000);
    render();
  }
  function tick() { if (!sess) return; var s = Math.round((Date.now() - sess.t0) / 1000); $("qtimer").textContent = Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
  function render() {
    var q = sess.queue[sess.i];
    $("qprog").textContent = (sess.i + 1) + " / " + sess.queue.length;
    $("qscore").textContent = "✓ " + sess.correct;
    $("qfill").style.width = (sess.i / sess.queue.length * 100) + "%";
    $("stemtopic").textContent = q.card.topic || "Findings";
    $("stemfind").innerHTML = ph(q.card.find);
    $("opts").innerHTML = q.opts.map(function (o, i) {
      return '<button class="opt" data-i="' + i + '"><span class="k">' + "ABCD".charAt(i) + "</span><span>" + esc(o) + "</span></button>";
    }).join("");
    Array.prototype.forEach.call($("opts").children, function (b) { b.onclick = function () { answer(+b.getAttribute("data-i")); }; });
    $("fb").className = "fb"; $("fb").innerHTML = "";
    $("nextbtn").classList.add("hidden");
    tick(); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function answer(choice) {
    var q = sess.queue[sess.i];
    if (sess.answered) return; sess.answered = true;
    var correct = choice === q.answer;
    Array.prototype.forEach.call($("opts").children, function (b, i) {
      b.onclick = null;
      if (i === q.answer) b.classList.add("correct");
      else if (i === choice) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    if (correct) sess.correct += 1;
    var fb = $("fb");
    fb.className = "fb show " + (correct ? "ok" : "no");
    fb.innerHTML = (correct ? "✓ Correct — " : "✗ ") + '<span class="ent">' + esc(q.card.front.replace(/^How would you describe (a |an |the )?/i, "").replace(/\?$/, "")) + "</span>" +
      (q.card.pearl ? '<div style="margin-top:7px;color:var(--tx2)">💡 ' + ph(q.card.pearl) + "</div>" : "");
    // persist lifetime stats
    var s = stats(); s.n += 1; if (correct) s.correct += 1; saveStats(s);
    $("nextbtn").classList.remove("hidden"); $("nextbtn").focus();
  }
  function next() {
    sess.answered = false;
    if (sess.i >= sess.queue.length - 1) return finish();
    sess.i += 1; render();
  }
  function finish() {
    if (tickT) { clearInterval(tickT); tickT = null; }
    var s = Math.round((Date.now() - sess.t0) / 1000);
    var pct = sess.queue.length ? Math.round(sess.correct / sess.queue.length * 100) : 0;
    var st = stats(); if (sess.correct > st.best) { st.best = sess.correct; saveStats(st); }
    $("quiz").classList.add("hidden");
    var em = pct >= 85 ? "🏆" : pct >= 60 ? "💪" : "📚";
    $("summary").classList.remove("hidden");
    $("summary").innerHTML = '<div class="summary"><div class="em">' + em + '</div><h2>' + sess.correct + " / " + sess.queue.length + " correct</h2>" +
      '<div class="grid">' +
      '<div class="cell"><div class="n">' + pct + '%</div><div class="l">Accuracy</div></div>' +
      '<div class="cell"><div class="n">' + Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60) + '</div><div class="l">Time</div></div>' +
      "</div><div class=\"row\"><button class=\"btn primary\" id=\"again\">Play again</button><button class=\"btn ghost\" id=\"back\">Change region</button></div></div>";
    $("again").onclick = start;
    $("back").onclick = function () { $("summary").classList.add("hidden"); $("start").classList.remove("hidden"); refreshStart(); hud(); window.scrollTo(0, 0); };
    if (window.MSKSync && window.MSKSync.sync) window.MSKSync.sync();
    hud(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("keydown", function (e) {
    if ($("quiz").classList.contains("hidden")) return;
    if (!sess.answered && /^[1-4]$/.test(e.key)) { answer(+e.key - 1); }
    else if (sess.answered && (e.key === " " || e.key === "Enter" || e.key === "ArrowRight")) { e.preventDefault(); next(); }
  });

  function init() {
    topicChips();
    $("topics").addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; sel.topic = b.getAttribute("data-topic"); Array.prototype.forEach.call($("topics").children, function (x) { x.classList.toggle("sel", x === b); }); refreshStart(); });
    $("sizes").addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; sel.size = +b.getAttribute("data-size"); Array.prototype.forEach.call($("sizes").children, function (x) { x.classList.toggle("sel", x === b); }); refreshStart(); });
    $("startbtn").onclick = start;
    $("nextbtn").onclick = next;
    refreshStart(); hud();
  }
  if (FC.length < 4) { document.querySelector("main").innerHTML = '<p style="padding:40px 0;color:#aab4c5">Deck not loaded.</p>'; }
  else init();
})();
