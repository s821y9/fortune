import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, fortune, reflection, date } = await req.json();

  try {
    //test
    //console.log('Saving fortune:', { email, date, fortune, reflection, fulfilled: false });
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          fortunes: { date, fortune, reflection, fulfilled: false }
        }
      },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Failed to save fortune' }, { status: 500 });
  }
}