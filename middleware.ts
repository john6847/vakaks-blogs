import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'
import { appSessionName } from './lib/config/constants';
/* import jwt from "jsonwebtoken";

function getToken(accessToken: string | null | undefined){
  // const accessToken = cookies().get(appSessionName)?.value || null;
  if(!accessToken) return null;
  const decoded = jwt.decode(accessToken)
  if(!decoded) return null;
  const { exp, aud } = decoded as { exp: number, aud: string };
  if(aud !== process.env.FIREBASE_PROJECT_ID) return null;
  if(Date.now() >= exp * 1000) return null;
  return decoded;
} */
export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const token = cookies().get(appSessionName)?.value || null;

  if (!token && path.startsWith("/dashboard")) return NextResponse.redirect(new URL("/", request.url));

  if(path.startsWith("/api/auth")) return NextResponse.next();

  /* if(!token && path.startsWith("/api")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 */
  return NextResponse.next();
}


export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] }