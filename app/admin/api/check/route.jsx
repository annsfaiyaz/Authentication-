import { NextResponse } from 'next/server';
import { User } from '../../../../models/userModels';
import dbConnect from '../../../../lib/dbConnect';

export async function GET() {
    try {
        await dbConnect();
        const adminExists = await User.exists({ role: 'admin' });
        return NextResponse.json({ adminExists: !!adminExists });
    } catch (error) {
        console.error('Check admin error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}