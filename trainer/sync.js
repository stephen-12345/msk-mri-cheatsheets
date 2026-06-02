/* MSK Trainer — optional cloud sync (Firebase Auth + Firestore).
   No-ops gracefully when window.FIREBASE_CONFIG.enabled !== true, so the
   trainer always works offline. When enabled, signs the user in and keeps
   localStorage progress merged with a per-user Firestore document. */
(function () {
  "use strict";
  var cfg = window.FIREBASE_CONFIG || { enabled: false };
  var acct = document.getElementById("acct");
  var SETUP = "Cloud sync isn't set up yet.\n\nYour progress is saved on this device. To sync XP, streaks, and missed questions across your phone and computer, open trainer/firebase-config.js and follow the steps to connect a free Firebase project.";
  function setAcct(text) { if (acct) acct.textContent = text; }
  function fire() { window.dispatchEvent(new Event("msk-synced")); }

  if (!cfg.enabled) {
    setAcct("☁︎ Sync");
    if (acct) acct.onclick = function () { alert(SETUP); };
    window.MSKSync = { enabled: false };
    return;
  }

  // ---- local progress helpers ----
  function lget(k, d) { var v = localStorage.getItem(k); return v == null ? d : v; }
  function loadLocal() {
    return {
      xp: +lget("mskt-xp", 0) || 0,
      best: +lget("mskt-best", 0) || 0,
      day: JSON.parse(lget("mskt-day", '{"last":"","count":0}')),
      results: JSON.parse(lget("mskt-results", "{}")),
      flash: JSON.parse(lget("mskt-flash", "{}"))
    };
  }
  function saveLocal(d) {
    localStorage.setItem("mskt-xp", d.xp || 0);
    localStorage.setItem("mskt-best", d.best || 0);
    localStorage.setItem("mskt-day", JSON.stringify(d.day || { last: "", count: 0 }));
    localStorage.setItem("mskt-results", JSON.stringify(d.results || {}));
    localStorage.setItem("mskt-flash", JSON.stringify(d.flash || {}));
  }
  function pickDay(a, b) {
    a = a || { last: "", count: 0 }; b = b || { last: "", count: 0 };
    var ta = a.last ? Date.parse(a.last) : 0, tb = b.last ? Date.parse(b.last) : 0;
    if (ta === tb) return { last: a.last || b.last, count: Math.max(a.count || 0, b.count || 0) };
    return ta > tb ? a : b;
  }
  function merge(L, C) {
    C = C || {};
    var r = Object.assign({}, C.results || {});
    var lr = L.results || {};
    Object.keys(lr).forEach(function (id) {
      var a = lr[id], c = r[id];
      if (!c || (a.seen || 0) >= (c.seen || 0)) r[id] = { seen: Math.max(a.seen || 0, (c && c.seen) || 0), pass: a.pass };
    });
    // flashcards: keep whichever copy has more reviews (higher seen) per card
    var f = Object.assign({}, C.flash || {});
    var lf = L.flash || {};
    Object.keys(lf).forEach(function (id) {
      var a = lf[id], c = f[id];
      if (!c || (a.seen || 0) >= (c.seen || 0)) f[id] = a;
    });
    return {
      xp: Math.max(L.xp || 0, C.xp || 0),
      best: Math.max(L.best || 0, C.best || 0),
      day: pickDay(L.day, C.day),
      results: r,
      flash: f,
      updated: Date.now()
    };
  }

  var V = "https://www.gstatic.com/firebasejs/10.12.2/";
  Promise.all([
    import(V + "firebase-app.js"),
    import(V + "firebase-auth.js"),
    import(V + "firebase-firestore.js")
  ]).then(function (m) {
    var appMod = m[0], authMod = m[1], fsMod = m[2];
    var app = appMod.initializeApp({
      apiKey: cfg.apiKey, authDomain: cfg.authDomain, projectId: cfg.projectId, appId: cfg.appId
    });
    var auth = authMod.getAuth(app);
    var db = fsMod.getFirestore(app);
    var userRef = null, pushTimer = null;

    function ref(uid) { return fsMod.doc(db, "users", uid); }

    async function syncNow() {
      if (!userRef) return;
      try {
        var snap = await fsMod.getDoc(userRef);
        var merged = merge(loadLocal(), snap.exists() ? snap.data() : {});
        saveLocal(merged);
        await fsMod.setDoc(userRef, merged, { merge: true });
        fire();
      } catch (e) { /* offline: keep local */ }
    }
    async function pushOnly() {
      if (!userRef) return;
      try { var d = loadLocal(); d.updated = Date.now(); await fsMod.setDoc(userRef, d, { merge: true }); } catch (e) {}
    }

    authMod.onAuthStateChanged(auth, function (user) {
      if (user) {
        userRef = ref(user.uid);
        setAcct((user.isAnonymous ? "☁︎ Guest" : ("☁︎ " + (user.displayName || user.email || "Account").split(" ")[0])) + " ✓");
        acct.onclick = function () { if (confirm("Sign out of cloud sync? Progress stays on this device.")) authMod.signOut(auth); };
        syncNow();
        if (pushTimer) clearInterval(pushTimer);
        pushTimer = setInterval(pushOnly, 20000);
        window.addEventListener("beforeunload", pushOnly);
      } else {
        userRef = null; if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }
        setAcct("☁︎ Sign in");
        acct.onclick = doSignIn;
      }
    });

    function doSignIn() {
      var prov = new authMod.GoogleAuthProvider();
      authMod.signInWithPopup(auth, prov).catch(function () {
        // fall back to anonymous if popup blocked / no provider
        authMod.signInAnonymously(auth).catch(function () { setAcct("☁︎ sign-in failed"); });
      });
    }
    window.MSKSync = { enabled: true, signIn: doSignIn, sync: syncNow };
    setAcct("☁︎ Sign in");
    if (acct) acct.onclick = doSignIn;
  }).catch(function () {
    setAcct("☁︎ offline");
    window.MSKSync = { enabled: false };
  });
})();
