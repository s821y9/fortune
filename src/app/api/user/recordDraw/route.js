import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, date, fortune } = body;

    if (!email || !date) {
      return NextResponse.json({ success: false, message: 'Missing email or date' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        lastDrawDate: date,
        todayFortune: fortune,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, lastDrawDate: user.lastDrawDate });
  } catch (error) {
    console.error('Error recording draw:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}