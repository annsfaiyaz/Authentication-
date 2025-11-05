'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onLogin = async (previousState, formData) => {
        try {
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await axios.post('/admin/api/login', { email, password });

            if (response.status === 200) {
                router.push('/admin/dashboard');
                return { success: true, message: response.data.message };
            } else {
                return { success: false || 'Invalid credentials' };
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || 'Something went wrong';
            return { success: false, error: errMsg };
        }
    };

    const [state, handleSubmit, isPending] = useActionState(onLogin, undefined);

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-[#1E293B] mb-2">Admin Sign In</h1>
                        <p className="text-[#64748B]">Access the admin dashboard with your credentials.</p>
                    </div>

                    <form action={handleSubmit} className="space-y-5" aria-describedby="form-status">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#1E293B] mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                                className="w-full p-4 rounded-md border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[#1E293B]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#1E293B] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                    className="w-full p-4 rounded-md border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent text-[#1E293B]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B]"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link href="#" className="text-sm text-[#0F4C5C] hover:text-[#1B7B7F] font-medium">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#0F4C5C] text-white py-4 rounded-lg font-medium hover:bg-[#0D3F4A] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Signing in…' : 'Sign In'}
                        </button>

                        {/* Form status messages */}
                        <div id="form-status" className="text-center mt-2">
                            {state?.success && <p className="text-green-600">{state.message}</p>}
                            {state?.error && <p className="text-red-500">{state.error}</p>}
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#64748B]">
                            Don't have an Account?{' '}
                            <Link href="/admin/sign-up" className="text-[#0F4C5C] hover:text-[#1B7B7F] font-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
