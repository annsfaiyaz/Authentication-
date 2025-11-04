import { NextResponse } from 'next/server';
import { User } from '../../../../models/userModels';
import dbConnect from '../../../../lib/dbConnect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    await dbConnect();
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email, role: 'admin' })

        if (!user) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
            }
            const tokenData = { id: user._id, role: user.role }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })
            const response = NextResponse.json({ message: 'Login successful', token }, { status: 200 });

            response.cookies.set('adminToken', token, { httpOnly: true })
            return response;
    }
    catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}