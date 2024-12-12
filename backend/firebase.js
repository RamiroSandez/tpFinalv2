const admin = require("firebase-admin");
const serviceAccount = require("./tp-backend-238c2-firebase-adminsdk-gk5pq-9c165daa07.json"); // Ruta relativa a tu archivo JSON

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tp-backend-238c2.firebaseio.com", // Asegúrate de que este URL sea correcto
});

console.log("Firebase Admin SDK inicializado correctamente.");

module.exports = admin;
