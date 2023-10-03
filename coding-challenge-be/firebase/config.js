const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// Fetch the service account key JSON file contents
var serviceAccount = require("../credentials.json");

// Initialize the app with a service account, granting admin privileges
initializeApp({
  credential: cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
});

const db = getFirestore();
// collections
const usersRef = db.collection("users");

module.exports = { db, usersRef };
