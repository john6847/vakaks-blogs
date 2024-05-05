
// @joe-watson-sbf
// app > api > auth > sign-in > route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { createSessionCookie } from '@/lib/config/firebase-server';
import { APIResponse } from '@/types';
import { appSessionName } from '@/lib/config/constants';

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string };
  const idToken = reqBody.idToken;

  const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days

  const sessionCookie = await createSessionCookie(idToken, { 
    expiresIn 
  });

  cookies().set(appSessionName, sessionCookie, { 
    maxAge: expiresIn, 
    httpOnly: true, 
    secure: true 
  });

  return NextResponse.json<APIResponse<string>>(
    { 
      success: true, 
      data: "Signed in successfully." 
    });
}
















