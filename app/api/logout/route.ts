// /app/api/logout/route.ts (or /pages/api/logout.ts depending on your setup)
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0), // Expire immediately
  });

  return NextResponse.json({ message: 'Logged out' }, {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
    },

  })
  ;
}

