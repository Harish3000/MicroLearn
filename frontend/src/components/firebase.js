// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2kQmfGqLzjpf71N6zYoyzC8RC9XdDnbA",
  authDomain: "micro-auth-5c05e.firebaseapp.com",
  projectId: "micro-auth-5c05e",
  storageBucket: "micro-auth-5c05e.appspot.com",
  messagingSenderId: "92659810355",
  appId: "1:92659810355:web:8ffe119fdf7dca64e22346",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
