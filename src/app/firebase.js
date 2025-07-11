// src/app/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqo4iV9JNlkynjKtvpQ7wEdi9aO9MfL3M",
  authDomain: "firestore-crud-1fb36.firebaseapp.com",
  projectId: "firestore-crud-1fb36",
  storageBucket: "firestore-crud-1fb36.firebasestorage.app",
  messagingSenderId: "40135083133",
  appId: "1:40135083133:web:b5c0dbeda982a789259d14"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
