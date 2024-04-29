import "server-only";

import { cookies } from "next/headers";
import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";
import { appAuthName, appSessionName } from './constants';
import { getUserByEmail } from '../services/users';
import { Account } from '@/types';

const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_projectId as string,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID as string,
  private_key: process.env.FIREBASE_PRIVATE_KEY as string,
  client_email: process.env.FIREBASE_CLIENT_EMAIL as string,
  client_id: process.env.FIREBASE_CLIENT_ID as string,
  auth_uri: process.env.FIREBASE_AUTH_URI as string,
  token_uri: process.env.FIREBASE_TOKEN_URI as string,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL as string,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL as string,
} as ServiceAccount;


export const app =
  getApps().find((it) => it.name === appAuthName) ||
  initializeApp(
    {
      credential: cert(serviceAccount),
    },
    appAuthName
  );
export const auth = getAuth(app);




export async function isUserAuthenticated(session: string | undefined = undefined) {
  const _vaks_session = session ?? (await getSession());
  if (!_vaks_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_vaks_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser():Promise<Account> {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null as any
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);
  const account = await getUserByEmail(currentUser.email!);
  return account;
}

async function getSession() {
  try {
    return cookies().get(appSessionName)?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);
  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}











/* import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_projectId,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

export const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
}) : activeApps[0]; */