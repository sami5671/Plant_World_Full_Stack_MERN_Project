// const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert(require("./serviceAccountKey.json")),
// });

// // Set admin manually
// async function setAdmin(uid) {
//   try {
//     await admin.auth().setCustomUserClaims(uid, { admin: true });
//     console.log(`Successfully set admin role for UID: ${uid}`);
//   } catch (error) {
//     console.error("Error setting admin role:", error);
//   }
// }

// // Example: call the function with the user's UID
// setAdmin("cKwyBqEdg1ZgE4OIQCo1xI45IQ12");
