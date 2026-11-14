LITTLE LEDGER — FIREBASE CONNECTED STARTER

This build keeps the Phase 3 interface and adds Google sign-in + per-account Firestore sync.

IMPORTANT BEFORE USE
1. Keep your Firebase project on the Spark plan. Do not add billing.
2. In Firebase Console > Firestore > Rules, replace the current rules with the contents of firestore.rules and Publish.
3. In Firebase Console > Authentication > Settings > Authorized domains, ensure the domain where this app is hosted is listed. Firebase Hosting domains are normally added automatically; if hosting elsewhere, add that exact domain.
4. Host the contents of this folder on HTTPS. Do not open index.html as a local file; Google redirect sign-in and service worker require a hosted origin.
5. Google sign-in uses redirect flow for better mobile-browser compatibility.

DATA PRIVACY
- Firestore path: users/{uid}/private/main
- Rules allow a signed-in user to read/write only documents under their own UID.
- A newly signed-in account with no cloud document starts EMPTY. No embedded personal transaction data is shipped to family members.
- Import your own JSON backup only after signing into your own Google account. The existing Restore backup function writes imported records to that signed-in account.
- Existing local browser storage is not automatically uploaded. Export it first if it contains records you need to keep.
- Theme/language/brand/game preferences are synced in the same private document.

TESTING CHECKLIST
1. Sign in with the owner's Google account; confirm cloud sync ready.
2. Restore the owner's backup; add a test record; refresh; verify it remains.
3. Sign out; sign in with a second family Google account; confirm it starts empty.
4. Add a test record to the second account; sign out and back into the owner account; verify the owner's records are unchanged.
5. Do not use real family data until both accounts have passed the isolation test.

TECHNICAL NOTE
Uses Firebase compat SDK 10.14.1 from Google's gstatic CDN, Firestore document writes, and Firebase Authentication Google redirect sign-in. Cloud sync is activated only after sign-in and the initial cloud load.
