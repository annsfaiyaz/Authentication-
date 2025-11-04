import { NextResponse } from 'next/server';
import { User } from '../../../../models/userModels';
import dbConnect from '../../../../lib/dbConnect';


export async function POST(request) {
    await dbConnect();
    try {
        const {token} = await request.json();
        // console.log(token);

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        return NextResponse.json({ message: 'Email verified successfully', user }, { status: 200 });
    }
    catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}