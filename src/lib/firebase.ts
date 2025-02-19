// lib/firebase.js or utils/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add Firestore if you plan to use it
import { getAnalytics } from "firebase/analytics"; // You can skip this if you don't need analytics

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACmSgPXqvaTxNyKHv5GdLFb7b-RKci1Zk",
  authDomain: "agron-cloak.firebaseapp.com",
  projectId: "agron-cloak",
  storageBucket: "agron-cloak.firebasestorage.app",
  messagingSenderId: "1065613575581",
  appId: "1:1065613575581:web:06b2dcd8a1f869b9799b74",
  measurementId: "G-QTN5K6D1JH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: If you want to use Firebase analytics
const db = getFirestore(app); // Initialize Firestore

export { app, db, analytics };
