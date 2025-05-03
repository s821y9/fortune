// src/app/api/test/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function GET() {
  await dbConnect();
  const testUser = await User.create({
    email: 'test@example.com',
    birthday: '2000-01-01',
  });
  return NextResponse.json({ success: true, user: testUser });
}