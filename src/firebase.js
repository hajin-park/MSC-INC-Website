// Firebase Authentication used for administrative features
// Firebase Storage used for Events & Activities calender image storage
// Firebase Firestore used for Events & Activities category storage

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYcKnc0Xzio9wTy0zGYuMPQdtK30I0o-0",
  authDomain: "merced-seniors.firebaseapp.com",
  projectId: "merced-seniors",
  storageBucket: "merced-seniors.appspot.com",
  messagingSenderId: "559832213498",
  appId: "1:559832213498:web:c698e5c4c007c54ac42643",
  measurementId: "G-8Z154T5TMB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);