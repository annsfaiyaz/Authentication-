import { NextResponse } from 'next/server';
import { User } from '../../../models/userModels';
import dbConnect from '../../../lib/dbConnect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    await dbConnect();
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        if (!user.isVerified) {
            return NextResponse.json({ error: 'Please verify your email' }, { status: 401 });
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
            }
            const tokenData = { id: user._id }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })
            const response = NextResponse.json({ message: 'Login successful', token }, { status: 200 });

            response.cookies.set('token', token, { httpOnly: true })
            return response;
        }
    }
    catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}