
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token && path.startsWith("/dashboard")) return NextResponse.redirect(new URL("/", request.url));

  if(path.startsWith("/api/auth")) return NextResponse.next();

  /* if(!token && path.startsWith("/api")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 */
  return NextResponse.next();
}


export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] }