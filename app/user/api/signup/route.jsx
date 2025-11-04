import { NextResponse } from 'next/server';
import { User } from '../../../../models/userModels';
import dbConnect from '../../../../lib/dbConnect';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../../../helpers/nodeMailer';

export async function POST(request) {
    await dbConnect();
    try {
        const { name, email, password } = await request.json();
      
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const savedUser = await User.create({ name, email, password: hashedPassword });
        

        sendEmail({email, emailType: 'Verify', userId: savedUser._id})
        return NextResponse.json({ message: 'User created successfully', savedUser }, { status: 201 });


    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
