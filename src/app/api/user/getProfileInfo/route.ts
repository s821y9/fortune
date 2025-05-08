import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req: Request) {
  await dbConnect();
  const { email } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ success: false, error: 'User not found' });

    return NextResponse.json({
      success: true,
      birthday: user.birthday || '',
      email: user.email || '',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Server error' });
  }
}