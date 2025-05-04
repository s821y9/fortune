import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users'; 

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, birthday } = body;

    let user = await User.findOne({ email });

    if (user) {
      user.birthday = birthday || user.birthday;
      await user.save();
    } else {
      user = await User.create({ email, birthday });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}