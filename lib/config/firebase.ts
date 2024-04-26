import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey as string,
  authDomain: process.env.NEXT_PUBLIC_authDomain as string,
  projectId: process.env.NEXT_PUBLIC_projectId as string,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket as string,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId as string,
  appId: process.env.NEXT_PUBLIC_appId as string,
  measurementId: process.env.NEXT_PUBLIC_measurementId as string,
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
