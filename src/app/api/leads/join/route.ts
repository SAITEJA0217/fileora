import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    let lead = await Lead.findOne({ email });
    if (lead) {
      return NextResponse.json({ success: false, message: 'You are already on the list! 🚀' }, { status: 400 });
    }

    lead = new Lead({ email });
    await lead.save();

    return NextResponse.json({ 
      success: true,
      message: 'Welcome to the nest! We will notify you soon. 🐣' 
    });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false,
      message: err.message 
    }, { status: 500 });
  }
}
