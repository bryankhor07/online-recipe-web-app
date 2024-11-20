// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "online-recipe-19b1d.firebaseapp.com",
  projectId: "online-recipe-19b1d",
  storageBucket: "online-recipe-19b1d.firebasestorage.app",
  messagingSenderId: "358152541655",
  appId: "1:358152541655:web:e46c93df604d1c21a2e792",
  measurementId: "G-H414BNZQBE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Auth object for authentication
export const provider = new GoogleAuthProvider(); // Google Auth Provider object
export const db = getFirestore(app); // Firestore object for database
