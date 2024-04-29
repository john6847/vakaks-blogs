import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Account, APIResponse } from "@/types";
import { auth } from './config/firebase-client';


export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}



export async function logOut() {
  try {
    await signOut(auth);
    
  const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}

export async function getCurrentUser():Promise<Account> {
  try {
    const response = await fetch("/api/auth/me");
    const resBody = (await response.json()) as APIResponse<Account>;
    if (response.ok && resBody?.success) {
      return resBody.data;
    } else return null as any;
  } catch (error) {
    console.error("Error getting current user", error);
    return null as any;
  }
}

export async function isUserAuthenticated():Promise<boolean> {
  try {
    const response = await fetch("/api/auth/verify");
    const result:boolean = await response.json()
    return result;
  } catch (error) {
    return false;
  }
}


