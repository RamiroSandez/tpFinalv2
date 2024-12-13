const admin = require("firebase-admin");
const serviceAccount = require("./firebasedatos.json"); // Ruta relativa a tu archivo JSON

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase Admin SDK inicializado correctamente.");

module.exports = admin;
