// import { signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleProvider } from "../config/firebase";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";

// export const Auth = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("firebaseToken");

//     if (token) {
//       navigate("/protected");
//     }
//   }, []);

//   const singInWithGoogle = async () => {
//     try {
//       const a = await signInWithPopup(auth, googleProvider);

//       localStorage.setItem("firebaseToken", a._tokenResponse.idToken);

//       navigate("/protected");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const logout = async () => {
//     await signOut(auth);

//     localStorage.removeItem("firebaseToken");
//   };

//   return (
//     <div className="p-d-flex p-jc-center p-ai-center" style={{ height: "100vh" }}>
//       <Card
//         title="Autenticación"
//         style={{ width: "400px", textAlign: "center" }}
//         className="p-shadow-5"
//       >
//         <h1 className="p-text-bold">Auth</h1>
//         <Button
//           label="Sign in with Google"
//           icon="pi pi-google"
//           className="p-button-success p-mb-2"
//           onClick={singInWithGoogle}
//         />
//         <Button
//           label="Logout"
//           icon="pi pi-sign-out"
//           className="p-button-danger"
//           onClick={logout}
//         />
//       </Card>
//     </div>
//   );
// };


import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./Auth.css"; // Archivo CSS separado

export const Auth = () => {
  const navigate = useNavigate();

  // Verifica si existe un token al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");
    if (token) {
      navigate("/protected"); // Navega a la ruta protegida
    }
  }, [navigate]);

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const token = await userCredential.user.getIdToken(); // Obtiene el token
      localStorage.setItem("firebaseToken", token); // Guarda el token
      console.log("Inicio de sesión exitoso", userCredential.user);
      navigate("/protected"); // Navega a la ruta protegida
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="auth-container">
      <Card
        title="Bienvenido"
        style={{ width: "400px", textAlign: "center" }}
        className="p-shadow-5 auth-card"
      >
        <h2 className="auth-title">Inicio de Sesión</h2>
        <p className="auth-subtitle">Accede con tu cuenta de Google</p>
        <Button
          label="Iniciar sesión con Google"
          icon="pi pi-google"
          className="p-button-success auth-button"
          onClick={signInWithGoogle}
        />
      </Card>
    </div>
  );
};

