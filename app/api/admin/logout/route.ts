import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');

  return NextResponse.json({ success: true });
}
