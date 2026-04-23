import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ 
    success: true,
    message: 'Logged out successfully' 
  });

  // Clear the cookie by setting it to expire in the past
  response.headers.set('Set-Cookie', 'token=; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=0');

  return response;
}
