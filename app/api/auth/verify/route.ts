import { NextRequest, NextResponse } from "next/server";
import { isUserAuthenticated } from '@/lib/config/firebase-server';
import { cookies } from 'next/headers';
import { appSessionName } from '@/lib/config/constants';

export async function GET(request: NextRequest) {

  const session = cookies().get(appSessionName)?.value;
  const isLogged = await isUserAuthenticated(session);  
  return NextResponse.json(isLogged)
}