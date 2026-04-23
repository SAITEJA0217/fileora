import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdmin } from '@/lib/admin';

export async function PUT(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  console.log(`[API HIT] Admin/UpdatePlan: ${ip}`);

  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { userId, plan } = await request.json();
    if (!['free', 'pro'].includes(plan)) {
      return NextResponse.json({ success: false, message: 'Invalid plan type' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndUpdate(
      userId, 
      { plan }, 
      { new: true }
    ).select('-password');
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: `User plan updated to ${plan}`,
      data: user
    });
  } catch (err: any) {
    console.error(`[Admin Error] ${ip}:`, err.message);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
