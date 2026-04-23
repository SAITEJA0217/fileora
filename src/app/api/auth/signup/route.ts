import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  console.log(`[API HIT] Signup: ${ip}`);
  
  try {
    rateLimit(ip);
    await connectDB();
    const { name, email, password } = await request.json();

    // 1. Validation
    if (!name || !email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'All fields are required' 
      }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password must be at least 8 characters' 
      }, { status: 400 });
    }

    // 2. Logic
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ 
        success: false, 
        message: 'User already exists' 
      }, { status: 400 });
    }

    const ADMIN_EMAILS = ['ksrsaitej@gmail.com'];
    user = new User({ 
      name, 
      email, 
      password,
      isAdmin: ADMIN_EMAILS.includes(email.toLowerCase())
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'fallback_secret_change_this', 
      { expiresIn: '7d' }
    );

    // 3. Response with HttpOnly Cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Account created successfully',
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
    console.error(`[Signup Error] ${ip}:`, err.message);
    return NextResponse.json({ 
      success: false, 
      message: err.message.includes('Too many requests') ? err.message : 'Internal server error' 
    }, { status: err.message.includes('Too many requests') ? 429 : 500 });
  }
}
