/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "encommerce-auth-next.firebaseapp.com",
  projectId: "encommerce-auth-next",
  storageBucket: "encommerce-auth-next.appspot.com",
  messagingSenderId: "133033362188",
  appId: "1:133033362188:web:7c413f9fe0aff273e87f29",
  measurementId: "G-6RHZLN157M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
