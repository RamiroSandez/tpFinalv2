import { initializeApp } from "firebase/app";
import { getAuth, onIdTokenChanged, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBURahnt6NP1NFU3T_yaBEQH6VtGbS_s4Q",
  authDomain: "tp-backend-238c2.firebaseapp.com",
  projectId: "tp-backend-238c2",
  storageBucket: "tp-backend-238c2.firebasestorage.app",
  messagingSenderId: "268509618064",
  appId: "1:268509618064:web:da4fe0501fa0c6f7d41d15",
  measurementId: "G-33VK6R80XS",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


onIdTokenChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken(true); 
    localStorage.setItem("firebaseToken", token); 
  } else {
    localStorage.removeItem("firebaseToken"); 
  }
});

export { analytics, app };
