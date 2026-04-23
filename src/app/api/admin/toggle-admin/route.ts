import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdmin } from '@/lib/admin';

export async function PUT(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  console.log(`[API HIT] Admin/ToggleAdmin: ${ip}`);

  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { userId } = await request.json();
    await connectDB();
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    return NextResponse.json({ 
      success: true,
      message: `Admin status toggled for ${user.email}`,
      data: { isAdmin: user.isAdmin }
    });
  } catch (err: any) {
    console.error(`[Admin Error] ${ip}:`, err.message);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
