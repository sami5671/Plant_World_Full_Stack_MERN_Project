import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA893kgrretH9wDsnFiNPAEfv08lAjs-vE",
  authDomain: "plant-world-v2.firebaseapp.com",
  projectId: "plant-world-v2",
  storageBucket: "plant-world-v2.firebasestorage.app",
  messagingSenderId: "239662154869",
  appId: "1:239662154869:web:a974dae83dd681083ce43c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
