import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdmin } from '@/lib/admin';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  console.log(`[API HIT] Admin/GetUsers: ${ip}`);

  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    await connectDB();
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true,
      data: users
    });
  } catch (err: any) {
    console.error(`[Admin Error] ${ip}:`, err.message);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
