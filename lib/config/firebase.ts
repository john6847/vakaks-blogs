import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_ZVKIWRKfVPS6JZycCetRCjZ1l7fCwH0",
  authDomain: "vakaks-c539f.firebaseapp.com",
  projectId: "vakaks-c539f",
  storageBucket: "vakaks-c539f.appspot.com",
  messagingSenderId: "320626518278",
  appId: "1:320626518278:web:f0549a5b0ec9c9de355687",
  measurementId: "G-DF9MQHFD1P"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)