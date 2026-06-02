/* ─────────────────────────────────────────────────────────────────────────
   Cloud sync configuration (optional).

   The trainer works fully offline without this. To enable accounts +
   cross-device progress sync (XP, streak, daily streak, missed questions):

   1. Go to https://console.firebase.google.com and create a project (free).
   2. Add a "Web app" → copy the config values it shows you into the fields below.
   3. In the console: Build → Authentication → enable "Anonymous" and/or "Google".
      Build → Firestore Database → Create database (production or test mode).
   4. Add this Firestore security rule so each user only touches their own doc:
        match /users/{uid} { allow read, write: if request.auth.uid == uid; }
   5. Add your site domain under Authentication → Settings → Authorized domains
        (e.g. stephen-12345.github.io).
   6. Set enabled: true below, commit, and push.

   Until enabled is true, the "☁︎ Sync" button just explains setup.
   ───────────────────────────────────────────────────────────────────────── */
window.FIREBASE_CONFIG = {
  enabled: false,
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_APP_ID"
};
