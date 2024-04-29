import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { APIResponse } from "@/types";
import { revokeAllSessions } from '@/lib/config/firebase-server';
import { appSessionName } from '@/lib/config/constants';

export async function GET() {
  const sessionCookie = cookies().get(appSessionName)?.value;

  if (!sessionCookie)
    return NextResponse.json<APIResponse<string>>({ success: false, data: "Session not found." }, { status: 400 });

  cookies().delete(appSessionName);

  await revokeAllSessions(sessionCookie);

  return NextResponse.json<APIResponse<string>>({ success: true, data: "Signed out successfully." });
}