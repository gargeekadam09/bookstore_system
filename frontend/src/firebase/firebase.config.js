// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "AIzaSyA7Swi_D3V0a2087-6WZ5BatsLdnfg9zYE",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "book-store-mern-app-7662b.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECT_ID || "book-store-mern-app-7662b",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "book-store-mern-app-7662b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID || "694090295069",
  appId: import.meta.env.VITE_APPID || "1:694090295069:web:be6843225fdcfeac7923f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);