import { NextResponse } from 'next/server';
import { User } from '../../../../models/userModels';
import dbConnect from '../../../../lib/dbConnect';
import bcrypt from 'bcrypt';

export async function POST(request) {
    await dbConnect();
    try {
        const { name, email, password } = await request.json();
      
        const adminExists = await User.exists({ role: 'admin' });
        if (adminExists) {
            return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const savedUser = await User.create({ name, email, password: hashedPassword, role: 'admin' });

        return NextResponse.json({ message: 'Admin created successfully', savedUser }, { status: 201 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
