 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7e352.firebaseapp.com",
  projectId: "mern-estate-7e352",
  storageBucket: "mern-estate-7e352.firebasestorage.app",
  messagingSenderId: "521844539534",
  appId: "1:521844539534:web:4460ae79c2608c22f549df",
  measurementId: "G-D8P3RZLYMY"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);