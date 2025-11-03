'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Profile() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();

    const onLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            await axios.get('/api/logout');
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error) {
            toast.error('Failed to logout');
            console.error("Error in onLogout:", error);
        } finally {
            setIsLoggingOut(false);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-lg font-semibold">
                            👤
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Profile</h1>
                            <p className="text-slate-600 text-sm">Manage your session and account</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={onLogout}
                            disabled={isLoggingOut}
                            aria-busy={isLoggingOut}
                            className="inline-flex items-center justify-center w-full rounded-lg bg-rose-600 px-4 py-2.5 text-white font-medium shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoggingOut && (
                                <svg
                                    className="mr-2 h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            )}
                            {isLoggingOut ? 'Logging out…' : 'Logout'}
                        </button>
                        <p className="mt-3 text-xs text-slate-500 text-center">You will be redirected to the login page.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}