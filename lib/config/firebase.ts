import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.apiKey as string,
  authDomain: process.env.authDomain as string,
  projectId: process.env.projectId as string,
  storageBucket: process.env.storageBucket as string,
  messagingSenderId: process.env.messagingSenderId as string,
  appId: process.env.appId as string,
  measurementId: process.env.measurementId as string,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)


export const generateId=(collectionName:string)=> {
  const ref = collection(db, collectionName)
  const docRef = doc(ref)
  return docRef.id
}
