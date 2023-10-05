const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// Fetch the service account key JSON file contents
var serviceAccount = require("../firebase_creds.json");

// Initialize the app with a service account, granting admin privileges
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
// collections
const usersRef = db.collection("users");

module.exports = { db, usersRef };
