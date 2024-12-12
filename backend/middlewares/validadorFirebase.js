// const admin = require("firebase-admin")

// const validarFirebase = async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Espera un token en el encabezado Authorization: Bearer <token>
//     if (!token) {
//       return res.status(401).json({ message: "No se proporcionó un token" });
//     }
  
//     try {
//       const decodedToken = await admin.auth().verifyIdToken(token);
//       req.user = decodedToken; // Agrega el usuario decodificado al objeto `req`
//         console.log(req.user)
//       next(); // Pasa al siguiente middleware o ruta
//     } catch (error) {
//       console.error("Error al verificar el token:", error);
//       return res.status(401).json({ message: "Token inválido" });
//     }
//   };



//   module.exports = {validarFirebase}

const admin = require("../firebase");


const validarUsuario = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recibido:", token);

  if (!token) {
    return res.status(401).json({ mensaje: "No autorizado, falta token" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Token verificado:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    res.status(401).json({ mensaje: "No autorizado, token inválido" });
  }
};

module.exports = { validarUsuario };



// const admin = require("../firebase"); 

// const validarUsuario = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       console.log("Encabezado Authorization no proporcionado");
//       return res.status(401).json({ message: "No se proporcionó el encabezado Authorization" });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       console.log("Token no proporcionado en el encabezado");
//       return res.status(401).json({ message: "No se proporcionó un token" });
//     }

//     const decodedToken = await admin.auth().verifyIdToken(token);
//     console.log("Token válido, usuario decodificado:", decodedToken);

//     const db = admin.firestore();
//     const userDoc = await db.collection("usuarios").doc(decodedToken.uid).get();

//     if (!userDoc.exists) {
//       console.log("Usuario no registrado en la base de datos");
//       return res.status(401).json({ message: "Usuario no registrado" });
//     }

//     req.user = { ...decodedToken, ...userDoc.data() };
//     next();
//   } catch (error) {
//     console.error("Error al validar el usuario:", error);

//     if (error.code === "auth/id-token-expired") {
//       return res.status(401).json({ message: "Token expirado" });
//     } else if (error.code === "auth/argument-error") {
//       return res.status(400).json({ message: "Token malformado o inválido" });
//     } else {
//       return res.status(401).json({ message: "Token inválido o no autorizado" });
//     }
//   }
// };

// module.exports = { validarUsuario };
