// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7o3jHDkWboIC0eVoVJ93nYwgEBtP0IrU",
  authDomain: "shelf-f5811.firebaseapp.com",
  projectId: "shelf-f5811",
  storageBucket: "shelf-f5811.firebasestorage.app",
  messagingSenderId: "503029784166",
  appId: "1:503029784166:web:e60db85abe2e6926fcd7a7",
  measurementId: "G-FH2E1F142D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;