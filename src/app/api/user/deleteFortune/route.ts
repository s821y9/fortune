import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, fortune } = await req.json();

    if (!email || !fortune) {
      return NextResponse.json({ success: false, message: 'Missing email or fortune' }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $pull: { fortunes: { fortune } } },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Delete fortune error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}