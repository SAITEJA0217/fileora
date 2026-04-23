import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  console.log(`[API HIT] Login: ${ip}`);

  try {
    rateLimit(ip);
    await connectDB();
    const { email, password } = await request.json();

    // 1. Validation
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email and password are required' 
      }, { status: 400 });
    }

    // 2. Logic
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'fallback_secret_change_this', 
      { expiresIn: '7d' }
    );

    // 3. Response with HttpOnly Cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful',
      data: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        plan: user.plan
      } 
    });

    response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);

    return response;
  } catch (err: any) {
    console.error(`[Login Error] ${ip}:`, err.message);
    return NextResponse.json({ 
      success: false, 
      message: err.message.includes('Too many requests') ? err.message : 'Internal server error' 
    }, { status: err.message.includes('Too many requests') ? 429 : 500 });
  }
}
