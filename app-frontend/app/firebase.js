// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwllhIH1a2yMwzkRNDrv4CcmGreQOuXpc",
  authDomain: "digital-diary-7d7e1.firebaseapp.com",
  projectId: "digital-diary-7d7e1",
  storageBucket: "digital-diary-7d7e1.firebasestorage.app",
  messagingSenderId: "147500635920",
  appId: "1:147500635920:web:89d8bbb934e8ffa9743795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);