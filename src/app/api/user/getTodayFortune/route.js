import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const today = new Date().toISOString().slice(0, 10); // e.g. "2025-05-04"
    const alreadyDrawn = user.lastDrawDate === today;

    return NextResponse.json({ alreadyDrawn, fortune: user.todayFortune || null });
  } catch (error) {
    console.error('Error checking today\'s fortune:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}