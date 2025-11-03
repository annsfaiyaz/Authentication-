'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
    const searchParams = useSearchParams();

    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);

    const onVerifyEmail = async (token) => {
        try {
            await axios.post('/api/verifiedEmail', { token });
            setVerified(true);
            setError(null);
        } catch (error) {
            setError(error.response.data.error);
            setVerified(false);
        }
    }

    useEffect(() => {
        const token = searchParams.get('token');
        setToken(token);
        onVerifyEmail(token);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            {verified &&
                <div className="text-green-500 text-center">
                    <h1 className="text-2xl font-bold text-center">Email verified successfully</h1>
                    <a href="/login" className="text-blue-500">Login</a>
                </div>}
            {error && <div className="text-red-500"><h1>Error: {error}</h1></div>}
        </div>
    )
}