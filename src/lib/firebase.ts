// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb9MYHIN5POso7Arm8oqKQW1tPV-lhQE4",
  authDomain: "ku-wongnai.firebaseapp.com",
  projectId: "ku-wongnai",
  storageBucket: "ku-wongnai.appspot.com",
  messagingSenderId: "728161070141",
  appId: "1:728161070141:web:f76053e4d1f5667d07ce54",
  measurementId: "G-BKBVKG28HB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
