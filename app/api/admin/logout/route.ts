import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');

  // Redirecionar para /admin após logout
  return NextResponse.redirect(new URL('/admin', request.url));
}
