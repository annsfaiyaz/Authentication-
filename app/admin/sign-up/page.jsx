'use client';

import { useActionState, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [adminExists, setAdminExists] = useState(null);
    const router = useRouter();

    // Check if an admin already exists
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axios.get('/admin/api/check');
                setAdminExists(res.data.adminExists);
            } catch (error) {
                console.error('Error checking admin:', error);
            }
        };
        checkAdmin();
    }, []);

    const onSignup = async (previousState, formData) => {
        try {
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await axios.post('/admin/api/signup', {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                router.push('/admin/login?success=true');
                return { success: true, message: response.data.message };
            } else {
                return { success: false, error: response.data.error || 'Something went wrong' };
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || 'Something went wrong';
            return { success: false, error: errMsg };
        }
    };

    const [state, handleSubmit, isPending] = useActionState(onSignup, undefined);

    // Show loading while checking admin existence
    if (adminExists === null) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-white">
                <div className="w-full max-w-md">

                    { !adminExists ? (
                        <>
                            <div className="mb-8">
                                <h1 className="text-2xl font-semibold text-[#1E293B] mb-2">Create Your Admin Account</h1>
                                <p className="text-[#64748B]">This will be the first admin for your system.</p>
                            </div>

                            <form action={handleSubmit} className="space-y-5">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-[#1E293B] mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 pl-11 rounded-md border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent transition-all text-[#1E293B] placeholder:text-[#94A3B8]"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#1E293B] mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 pl-11 rounded-md border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent transition-all text-[#1E293B] placeholder:text-[#94A3B8]"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-[#1E293B] mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a strong password"
                                            name="password"
                                            required
                                            className="w-full px-4 py-3 pl-11 rounded-md border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent transition-all text-[#1E293B] placeholder:text-[#94A3B8]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B] transition-colors"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-[#072229] text-white py-3 rounded-lg font-medium hover:bg-[#0D3F4A] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                                >
                                    {isPending ? 'Signing up...' : 'Sign Up'}
                                </button>

                                <div className="text-center">
                                    {state?.success && <p className="text-green-600 font-medium">{state.message}</p>}
                                    {state?.error && <p className="text-red-500 font-medium">{state.error}</p>}
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-semibold text-[#1E293B] mb-2">Admin Already Exists</h1>
                                <p className="text-[#64748B]">Please login with your existing admin account.</p>
                                <Link href="/admin/login" className="mt-4 inline-block bg-[#072229] text-white py-2 px-6 rounded hover:bg-[#0D3F4A] transition-all">
                                    Go to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
