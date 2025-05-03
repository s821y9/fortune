import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req: NextRequest) {
    await dbConnect();
  
    try {
      const { email } = await req.json();
  
      if (!email) {
        return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, fortunes: user.fortunes || [] });
    } catch (err) {
      console.error('Get fortunes error:', err);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}