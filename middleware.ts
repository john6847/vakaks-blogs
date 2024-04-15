
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token && path.startsWith("/dashboard")) return NextResponse.redirect(new URL("/", request.url));

  if(!token && (path.startsWith("/api") && !path.startsWith("/api/auth"))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.next();
}


export const config = { matcher: ["/:path*", "/api/:path*"] }