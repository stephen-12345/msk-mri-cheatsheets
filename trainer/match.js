/* Match It — pair findings snippets to diagnoses. Built from the describe-deck. */
(function () {
  "use strict";
  var FC = (window.FLASHCARDS || []).filter(function (c) { return c.find && c.impr; });
  var $ = function (id) { return document.getElementById(id); };
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function snippet(s) { s = s || ""; return s.length > 95 ? s.slice(0, 92).replace(/\s+\S*$/, "") + "…" : s; }

  var NAMES = { all: "All", shoulder: "Shoulder", knee: "Knee", hip: "Hip", ankle: "Ankle", foot: "Foot", elbow: "Elbow", wrist: "Wrist", hand: "Hand", spine: "Spine", tumor: "Tumor", general: "Core" };
  var ORDER = ["shoulder", "knee", "hip", "ankle", "foot", "elbow", "wrist", "hand", "spine", "tumor", "general"];
  var sel = { topic: "all", size: 5 };
  var g = null, tickT = null;
  function pool() { return FC.filter(function (c) { return sel.topic === "all" || c.joint === sel.topic; }); }

  function topicChips() {
    var set = {}; FC.forEach(function (c) { set[c.joint] = 1; });
    $("topics").innerHTML = ["all"].concat(ORDER).filter(function (j) { return j === "all" || set[j]; })
      .map(function (j) { return '<button class="chip' + (j === "all" ? " sel" : "") + '" data-topic="' + j + '">' + (NAMES[j] || j) + "</button>"; }).join("");
  }
  function refreshStart() {
    var n = pool().length;
    $("startbtn").disabled = n < sel.size;
    $("countnote").textContent = n < sel.size ? "Not enough cards in this region." : (sel.size + " pairs · " + n + " in pool");
  }

  function start() {
    var cards = shuffle(pool()).slice(0, sel.size);
    g = { cards: cards, matched: 0, misses: 0, t0: Date.now(), selL: null, selR: null, lock: false };
    $("start").classList.add("hidden"); $("summary").classList.add("hidden"); $("game").classList.remove("hidden");
    var leftItems = cards.map(function (c, i) { return { i: i, html: snippet(c.find) }; });
    var rightItems = shuffle(cards.map(function (c, i) { return { i: i, html: c.impr }; }));
    $("left").innerHTML = leftItems.map(function (it) { return '<button class="item" data-side="L" data-i="' + it.i + '">' + esc(it.html) + "</button>"; }).join("");
    $("right").innerHTML = rightItems.map(function (it) { return '<button class="item dx" data-side="R" data-i="' + it.i + '">' + esc(it.html) + "</button>"; }).join("");
    bind("left"); bind("right");
    if (tickT) clearInterval(tickT); tickT = setInterval(tick, 1000);
    update(); tick(); window.scrollTo(0, 0);
  }
  function bind(side) { Array.prototype.forEach.call($(side).children, function (b) { b.onclick = function () { pick(b); }; }); }
  function tick() { if (!g) return; var s = Math.round((Date.now() - g.t0) / 1000); $("gtimer").textContent = Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
  function update() { $("gprog").textContent = g.matched + " / " + g.cards.length + " matched"; $("gmiss").textContent = g.misses ? ("✗ " + g.misses) : ""; }

  function pick(b) {
    if (g.lock || b.classList.contains("done")) return;
    var side = b.getAttribute("data-side");
    var cur = side === "L" ? "selL" : "selR";
    // toggle off if re-tapping same
    if (g[cur] === b) { b.classList.remove("sel"); g[cur] = null; return; }
    // clear previous selection on this side
    if (g[cur]) g[cur].classList.remove("sel");
    g[cur] = b; b.classList.add("sel");
    if (g.selL && g.selR) evaluate();
  }
  function evaluate() {
    var L = g.selL, R = g.selR;
    g.lock = true;
    if (L.getAttribute("data-i") === R.getAttribute("data-i")) {
      L.classList.remove("sel"); R.classList.remove("sel");
      L.classList.add("done"); R.classList.add("done");
      g.selL = g.selR = null; g.lock = false; g.matched += 1; update();
      if (g.matched >= g.cards.length) finish();
    } else {
      g.misses += 1; update();
      L.classList.add("bad"); R.classList.add("bad");
      setTimeout(function () {
        L.classList.remove("bad", "sel"); R.classList.remove("bad", "sel");
        g.selL = g.selR = null; g.lock = false;
      }, 420);
    }
  }
  function finish() {
    if (tickT) { clearInterval(tickT); tickT = null; }
    var s = Math.round((Date.now() - g.t0) / 1000);
    $("game").classList.add("hidden"); $("summary").classList.remove("hidden");
    var em = g.misses === 0 ? "🏆" : g.misses <= 2 ? "💪" : "📚";
    $("summary").innerHTML = '<div class="summary"><div class="em">' + em + '</div><h2>Round complete</h2>' +
      '<div class="grid">' +
      '<div class="cell"><div class="n">' + Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60) + '</div><div class="l">Time</div></div>' +
      '<div class="cell"><div class="n">' + g.misses + '</div><div class="l">Mistakes</div></div>' +
      '</div><div class="row"><button class="btn primary" id="again">Play again</button><button class="btn ghost" id="back">Change region</button></div></div>';
    $("again").onclick = start;
    $("back").onclick = function () { $("summary").classList.add("hidden"); $("start").classList.remove("hidden"); refreshStart(); window.scrollTo(0, 0); };
    window.scrollTo(0, 0);
  }

  function init() {
    topicChips();
    $("topics").addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; sel.topic = b.getAttribute("data-topic"); Array.prototype.forEach.call($("topics").children, function (x) { x.classList.toggle("sel", x === b); }); refreshStart(); });
    $("sizes").addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; sel.size = +b.getAttribute("data-size"); Array.prototype.forEach.call($("sizes").children, function (x) { x.classList.toggle("sel", x === b); }); refreshStart(); });
    $("startbtn").onclick = start;
    refreshStart();
  }
  if (FC.length < 4) { document.querySelector("main").innerHTML = '<p style="padding:40px 0;color:#aab4c5">Deck not loaded.</p>'; }
  else init();
})();
