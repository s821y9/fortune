import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';


export async function POST(req: Request) {
    await dbConnect();
    const { email, birthday } = await req.json();
    try {
        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ success: false, error: 'User not found' });
        user.birthday = birthday;
        await user.save();
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: 'Server error' });
    }
}