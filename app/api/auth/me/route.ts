import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from '@/lib/config/firebase-server';
import { Account, APIResponse } from '@/types';

export async function GET(request: NextRequest) {

  // request params are available in the request object
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return NextResponse.json(null);

  return NextResponse.json<APIResponse<Account>>({ success: true, data: currentUser });
}