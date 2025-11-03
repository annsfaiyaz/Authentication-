import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';



export async function GET(request) {
    await dbConnect();
    try {
        const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
        response.cookies.delete('token');
        return response;
    }
    catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}