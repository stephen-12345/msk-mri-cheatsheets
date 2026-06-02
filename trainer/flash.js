/* MRI Flashcards — Anki-style spaced repetition (SM-2), keyboard-driven. */
(function () {
  "use strict";
  var FC = window.FLASHCARDS || [];
  var $ = function (id) { return document.getElementById(id); };
  var DAY = 864e5, NEW_PER_DAY = 20;

  function todayMid() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function store() { try { return JSON.parse(localStorage.getItem("mskt-flash") || "{}"); } catch (e) { return {}; } }
  function save(s) { localStorage.setItem("mskt-flash", JSON.stringify(s)); }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  // ---- scheduler (Anki 4-button: 0 Again, 1 Hard, 2 Good, 3 Easy) ----
  function schedule(c, g) {
    c = { ef: c.ef || 2.5, reps: c.reps || 0, interval: c.interval || 0, seen: c.seen || 0, lapses: c.lapses || 0 };
    if (g === 0) { c.reps = 0; c.interval = 1; c.ef = Math.max(1.3, c.ef - 0.2); c.lapses += 1; }
    else {
      if (c.reps === 0) { c.interval = g === 3 ? 4 : 1; c.reps = 1; }
      else if (c.reps === 1) { c.interval = g === 1 ? 2 : g === 2 ? 6 : 8; c.reps = 2; }
      else { var m = g === 1 ? 1.2 : g === 2 ? c.ef : c.ef * 1.3; c.interval = Math.round(c.interval * m); c.reps += 1; }
      var q = g === 1 ? 3 : g === 2 ? 4 : 5;
      c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    }
    c.interval = Math.max(1, Math.round(c.interval));
    c.due = todayMid() + c.interval * DAY; c.seen += 1;
    return c;
  }
  function preview(c, g) { return schedule(Object.assign({}, c), g).interval; }
  function fmtIv(d) { return d < 30 ? d + "d" : d < 365 ? Math.round(d / 30) + "mo" : (d / 365).toFixed(1) + "y"; }

  function isDue(r) { return !!r && r.due != null && r.due <= todayMid(); }
  function filtByTopic(c) { return sel.topic === "all" || c.joint === sel.topic; }
  function dueCards() { var s = store(); return FC.filter(filtByTopic).filter(function (c) { return isDue(s[c.id]); }); }
  function newCards() { var s = store(); return FC.filter(filtByTopic).filter(function (c) { return !s[c.id]; }); }

  var sel = { topic: "all" };
  var sess = null, tickT = null;

  // ---- start screen ----
  function topicChips() {
    var set = {}; FC.forEach(function (c) { set[c.joint] = 1; });
    var order = ["all", "shoulder", "knee", "hip", "ankle", "foot", "elbow", "wrist", "hand", "general"];
    var nm = { all: "All", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand", general: "Core" };
    $("topics").innerHTML = order.filter(function (j) { return j === "all" || set[j]; })
      .map(function (j) { return '<button class="chip' + (j === "all" ? " sel" : "") + '" data-topic="' + j + '">' + nm[j] + "</button>"; }).join("");
  }
  function refreshStart() {
    var due = dueCards().length, fresh = Math.min(NEW_PER_DAY, newCards().length);
    var total = due + fresh;
    $("startbtn").disabled = total === 0;
    $("countnote").textContent = total ? (total + " card" + (total > 1 ? "s" : "") + " this session  ·  " + due + " due, " + fresh + " new") : "Nothing due — switch topic or come back tomorrow.";
    var b = $("duebanner"), allDue = FC.filter(function (c) { return isDue(store()[c.id]); }).length;
    if (allDue > 0) { b.innerHTML = "🗓 <b>" + allDue + "</b> card" + (allDue > 1 ? "s" : "") + " due across all topics — tap to start"; b.classList.add("active"); }
    else { b.innerHTML = "✓ No reviews due — learn new cards below"; b.classList.remove("active"); }
    b.style.display = "";
  }
  function hud() {
    var due = FC.filter(function (c) { return isDue(store()[c.id]); }).length;
    var learned = Object.keys(store()).length;
    $("hudmeta").innerHTML = "🗓 <b>" + due + "</b> due · " + learned + "/" + FC.length + " seen";
  }

  // ---- session ----
  function startSession() {
    var due = dueCards();
    due.sort(function (a, b) { return (store()[a.id].due || 0) - (store()[b.id].due || 0); });
    var fresh = newCards().slice(0, NEW_PER_DAY);
    var queue = due.concat(fresh);
    if (!queue.length) return;
    sess = { queue: queue, i: 0, t0: Date.now(), again: 0, done: 0 };
    $("start").classList.add("hidden"); $("summary").classList.add("hidden"); $("study").classList.remove("hidden");
    if (tickT) clearInterval(tickT);
    tickT = setInterval(tick, 1000);
    renderCard();
  }
  function tick() {
    if (!sess) return;
    var s = Math.round((Date.now() - sess.t0) / 1000);
    $("ctimer").textContent = Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60);
  }
  function renderCard() {
    var c = sess.queue[sess.i];
    $("cprog").textContent = (sess.i + 1) + " / " + sess.queue.length;
    $("cagain").textContent = sess.again ? ("↻ " + sess.again) : "";
    $("cprogfill").style.width = (sess.i / sess.queue.length * 100) + "%";
    $("fctopic").textContent = c.topic || "";
    $("fcfront").textContent = c.front;
    $("fcback").textContent = c.back;
    $("fcbackwrap").classList.add("hidden");
    $("grades").classList.add("hidden");
    $("flipbtn").classList.remove("hidden");
    tick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function flip() {
    var c = sess.queue[sess.i], rec = store()[c.id] || {};
    $("fcback").textContent = c.back;
    $("fcbackwrap").classList.remove("hidden");
    $("flipbtn").classList.add("hidden");
    $("grades").classList.remove("hidden");
    [0, 1, 2, 3].forEach(function (g) { $("iv" + g).textContent = fmtIv(preview(rec, g)); });
  }
  function grade(g) {
    if ($("grades").classList.contains("hidden")) return;   // must flip first
    var c = sess.queue[sess.i], s = store();
    s[c.id] = schedule(s[c.id] || {}, g);
    save(s);
    if (g === 0) sess.again += 1;
    sess.done += 1;
    if (sess.i >= sess.queue.length - 1) finish();
    else { sess.i += 1; renderCard(); }
  }
  function finish() {
    if (tickT) { clearInterval(tickT); tickT = null; }
    $("study").classList.add("hidden");
    var s = Math.round((Date.now() - sess.t0) / 1000);
    var cpm = s > 0 ? (sess.done / (s / 60)) : sess.done;
    var su = $("summary"); su.classList.remove("hidden");
    su.innerHTML = '<div class="summary"><div class="em">🃏</div><h2>Deck complete</h2>' +
      '<div class="grid">' +
      '<div class="cell"><div class="n">' + sess.done + '</div><div class="l">Reviewed</div></div>' +
      '<div class="cell"><div class="n">' + Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60) + '</div><div class="l">Time</div></div>' +
      '<div class="cell"><div class="n">' + cpm.toFixed(1) + '</div><div class="l">Cards/min</div></div>' +
      '<div class="cell"><div class="n">' + sess.again + '</div><div class="l">Again</div></div>' +
      "</div>" +
      '<div class="row"><button class="btn primary" id="more">Review more</button><button class="btn ghost" id="back">Done</button></div></div>';
    $("more").onclick = function () { refreshStart(); startSession(); };
    $("back").onclick = function () { su.classList.add("hidden"); $("start").classList.remove("hidden"); refreshStart(); hud(); window.scrollTo(0, 0); };
    if (window.MSKSync && window.MSKSync.sync) window.MSKSync.sync();
    hud();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- keyboard ----
  document.addEventListener("keydown", function (e) {
    if ($("study").classList.contains("hidden")) return;
    var flipped = !$("grades").classList.contains("hidden");
    if (!flipped) {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") { e.preventDefault(); flip(); }
    } else {
      if (e.key === "1") { grade(0); }
      else if (e.key === "2") { grade(1); }
      else if (e.key === "3" || e.key === " " || e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); grade(2); }
      else if (e.key === "4") { grade(3); }
    }
  });

  // ---- wire ----
  function init() {
    topicChips();
    $("topics").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      sel.topic = b.getAttribute("data-topic");
      Array.prototype.forEach.call($("topics").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshStart();
    });
    $("startbtn").onclick = startSession;
    $("flipbtn").onclick = flip;
    $("grades").addEventListener("click", function (e) { var b = e.target.closest(".grade"); if (b) grade(+b.getAttribute("data-g")); });
    $("duebanner").onclick = function () { sel.topic = "all"; Array.prototype.forEach.call($("topics").children, function (x) { x.classList.toggle("sel", x.getAttribute("data-topic") === "all"); }); refreshStart(); startSession(); };
    window.addEventListener("msk-synced", function () { hud(); if (!$("start").classList.contains("hidden")) refreshStart(); });
    refreshStart(); hud();
  }
  if (!FC.length) { document.querySelector("main").innerHTML = '<p style="padding:40px 0;color:#aab4c5">Deck failed to load.</p>'; }
  else init();
})();
