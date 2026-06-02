/* MRI Flashcards — Anki-style spaced repetition (SM-2), keyboard-driven. */
(function () {
  "use strict";
  var FC = window.FLASHCARDS || [];
  var $ = function (id) { return document.getElementById(id); };
  var DAY = 864e5;

  function todayMid() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function store() { try { return JSON.parse(localStorage.getItem("mskt-flash") || "{}"); } catch (e) { return {}; } }
  function save(s) { localStorage.setItem("mskt-flash", JSON.stringify(s)); }
  // ---- daily activity log (for streak calendar) ----
  function dkey(d) { d = d || new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function activity() { try { return JSON.parse(localStorage.getItem("mskt-flash-log") || "{}"); } catch (e) { return {}; } }
  function logActivity() { var a = activity(); a[dkey()] = (a[dkey()] || 0) + 1; localStorage.setItem("mskt-flash-log", JSON.stringify(a)); }
  function streaks() {
    var a = activity(), cur = 0, best = 0, total = 0;
    Object.keys(a).forEach(function (k) { total += a[k]; });
    var d = new Date(); d.setHours(0, 0, 0, 0);
    if (!a[dkey(d)]) d = new Date(d.getTime() - DAY);   // today not done yet → count through yesterday
    while (a[dkey(d)]) { cur++; d = new Date(d.getTime() - DAY); }
    // longest run over all logged days
    var days = Object.keys(a).map(function (k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]).getTime(); }).sort(function (x, y) { return x - y; });
    var run = 0, prev = null;
    days.forEach(function (t) { if (prev != null && t - prev === DAY) run++; else run = 1; if (run > best) best = run; prev = t; });
    return { cur: cur, best: best, total: total, daysActive: days.length };
  }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  // style bracketed [options] placeholders like the cheat sheet
  function ph(t) { return esc(t).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>'); }
  // render a card's answer: structured F:/I:/pearl if present, else plain back text
  function renderBack(c) {
    if (c.find) {
      var h = '<div class="fc-f"><span class="lab f">F:</span> ' + ph(c.find) + "</div>";
      if (c.impr) h += '<div class="fc-f"><span class="lab i">I:</span> ' + ph(c.impr) + "</div>";
      if (c.pearl) h += '<div class="fc-pearl">💡 ' + ph(c.pearl) + "</div>";
      return h;
    }
    return esc(c.back);
  }

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

  var sel = { topic: "all", size: 20, time: 0 };
  var sess = null, tickT = null;
  function sessionCap() { return sel.size === "all" ? Infinity : sel.size; }

  // ---- start screen ----
  var ORDER = ["shoulder", "knee", "hip", "ankle", "foot", "elbow", "wrist", "hand", "spine", "tumor", "general"];
  var NAMES = { all: "All", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand", spine: "Spine", tumor: "Tumor", general: "Core" };
  function topicChips() {
    var set = {}; FC.forEach(function (c) { set[c.joint] = 1; });
    var order = ["all"].concat(ORDER);
    $("topics").innerHTML = order.filter(function (j) { return j === "all" || set[j]; })
      .map(function (j) { return '<button class="chip' + (j === "all" ? " sel" : "") + '" data-topic="' + j + '">' + (NAMES[j] || j) + "</button>"; }).join("");
  }
  function refreshStart() {
    var due = dueCards().length, freshAvail = newCards().length;
    var avail = due + freshAvail;
    var total = Math.min(sessionCap(), avail);
    $("startbtn").disabled = total === 0;
    var timeNote = sel.time ? ("  ·  " + sel.time + "-min limit") : "";
    $("countnote").textContent = total ? (total + " card" + (total > 1 ? "s" : "") + " this session  ·  " + due + " due, " + freshAvail + " new available" + timeNote) : "Nothing here — switch topic or come back tomorrow.";
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

  // ---- stats screen: streak calendar + region heatmap ----
  function showStats() {
    var sk = streaks(), s = store();
    var seen = Object.keys(s).length;
    $("statkpis").innerHTML =
      kpi('<span class="fire">' + sk.cur + "🔥</span>", "Day streak") +
      kpi(sk.best, "Longest") +
      kpi(sk.total, "Reviews") +
      kpi(seen + "/" + FC.length, "Cards seen");
    renderCalendar();
    renderHeatmap(s);
    $("start").classList.add("hidden"); $("study").classList.add("hidden"); $("summary").classList.add("hidden");
    $("stats").classList.remove("hidden");
    window.scrollTo(0, 0);
  }
  function kpi(n, l) { return '<div class="cell"><div class="n">' + n + '</div><div class="l">' + l + "</div></div>"; }
  function renderCalendar() {
    var a = activity(), WEEKS = 18;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    // start on the Sunday that is (WEEKS-1) weeks before this week's Sunday
    var start = new Date(today.getTime() - today.getDay() * DAY - (WEEKS - 1) * 7 * DAY);
    var max = 0; Object.keys(a).forEach(function (k) { if (a[k] > max) max = a[k]; });
    function lvl(n) { if (!n) return 0; if (max <= 1) return 4; var r = n / max; return r > 0.66 ? 4 : r > 0.33 ? 3 : r > 0.1 ? 2 : 1; }
    var cells = "";
    for (var w = 0; w < WEEKS; w++) {
      for (var d = 0; d < 7; d++) {
        var day = new Date(start.getTime() + (w * 7 + d) * DAY);
        if (day > today) { cells += '<i class="future"></i>'; continue; }
        var n = a[dkey(day)] || 0;
        cells += '<i class="lv' + lvl(n) + '" title="' + dkey(day) + ": " + n + ' reviews"></i>';
      }
    }
    $("calendar").innerHTML = cells;
  }
  function renderHeatmap(s) {
    var by = {};
    FC.forEach(function (c) { var j = c.joint; if (!by[j]) by[j] = { total: 0, seen: 0, rev: 0 }; by[j].total++; var r = s[c.id]; if (r) { by[j].seen++; by[j].rev += (r.seen || 0); } });
    var html = "";
    ORDER.forEach(function (j) {
      if (!by[j]) return;
      var t = by[j], pc = Math.round(t.seen / t.total * 100);
      var q = pc === 0 ? 0 : pc < 34 ? 1 : pc < 67 ? 2 : 3;
      html += '<div class="tile q' + q + '"><div class="rg">' + (NAMES[j] || j) + "</div>" +
        '<div class="pc">' + pc + '%</div>' +
        '<div class="sub">' + t.seen + "/" + t.total + " cards · " + t.rev + " reviews</div>" +
        '<i class="fillbar" style="width:' + pc + '%"></i></div>';
    });
    $("heatmap").innerHTML = html;
  }

  // ---- session ----
  function fmtClock(s) { s = Math.max(0, s); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
  function startSession() {
    var s0 = store();
    var due = dueCards();
    due.sort(function (a, b) { return (s0[a.id].due || 0) - (s0[b.id].due || 0); });
    var fresh = shuffle(newCards());           // scramble new cards so "All" isn't shoulder-first
    var queue = due.concat(fresh);
    if (sel.size !== "all") queue = queue.slice(0, sel.size);
    if (!queue.length) return;
    sess = { queue: queue, i: 0, t0: Date.now(), again: 0, done: 0, limit: sel.time * 60 };
    $("start").classList.add("hidden"); $("summary").classList.add("hidden"); $("study").classList.remove("hidden");
    if (tickT) clearInterval(tickT);
    tickT = setInterval(tick, 1000);
    renderCard();
  }
  function tick() {
    if (!sess) return;
    var s = Math.round((Date.now() - sess.t0) / 1000);
    if (sess.limit) {
      var left = sess.limit - s;
      $("ctimer").textContent = "⏱ " + fmtClock(left);
      $("ctimer").style.color = left <= 30 ? "#e2737a" : "";
      if (left <= 0) { finish(); return; }
    } else {
      $("ctimer").textContent = fmtClock(s);
    }
  }
  function renderCard() {
    var c = sess.queue[sess.i];
    $("cprog").textContent = (sess.i + 1) + " / " + sess.queue.length;
    $("cagain").textContent = sess.again ? ("↻ " + sess.again) : "";
    $("cprogfill").style.width = (sess.i / sess.queue.length * 100) + "%";
    $("fctopic").textContent = c.topic || "";
    $("fcfront").textContent = c.front;
    $("fcback").innerHTML = renderBack(c);
    $("fcbackwrap").classList.add("hidden");
    $("grades").classList.add("hidden");
    $("flipbtn").classList.remove("hidden");
    tick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function flip() {
    var c = sess.queue[sess.i], rec = store()[c.id] || {};
    $("fcback").innerHTML = renderBack(c);
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
    logActivity();
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
    $("sizes").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      var v = b.getAttribute("data-size"); sel.size = v === "all" ? "all" : +v;
      Array.prototype.forEach.call($("sizes").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshStart();
    });
    $("times").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      sel.time = +b.getAttribute("data-time");
      Array.prototype.forEach.call($("times").children, function (x) { x.classList.toggle("sel", x === b); });
      refreshStart();
    });
    $("startbtn").onclick = startSession;
    $("statsbtn").onclick = showStats;
    $("statsback").onclick = function () { $("stats").classList.add("hidden"); $("start").classList.remove("hidden"); refreshStart(); hud(); window.scrollTo(0, 0); };
    $("flipbtn").onclick = flip;
    $("grades").addEventListener("click", function (e) { var b = e.target.closest(".grade"); if (b) grade(+b.getAttribute("data-g")); });
    $("duebanner").onclick = function () { sel.topic = "all"; Array.prototype.forEach.call($("topics").children, function (x) { x.classList.toggle("sel", x.getAttribute("data-topic") === "all"); }); refreshStart(); startSession(); };
    window.addEventListener("msk-synced", function () { hud(); if (!$("start").classList.contains("hidden")) refreshStart(); });
    refreshStart(); hud();
  }
  if (!FC.length) { document.querySelector("main").innerHTML = '<p style="padding:40px 0;color:#aab4c5">Deck failed to load.</p>'; }
  else init();
})();
