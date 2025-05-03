import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password, birthday } = await req.json();

    // 检查是否已存在
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      birthday,
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}