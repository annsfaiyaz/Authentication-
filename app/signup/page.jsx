'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSignup = async (previousState, formData) => {
        try {
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await axios.post('/api/signup', {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                router.push('/login?success=true');
                return { success: true, message: response.data.message };
            } else {
                return { success: false, error: response.data.error || 'Something went wrong' };
            }
        } catch (error) {
            return { success: false, error: 'Something went wrong' };
        }
    };

    const [state, handleSubmit, isPending] = useActionState(onSignup, undefined);

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-white">
                <div className="w-full max-w-md">

                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-[#1E293B] mb-2">Create Your Account</h1>
                        <p className="text-[#64748B]">Join thousands of teams revolutionizing their QA process.</p>
                    </div>

                    <form action={handleSubmit} className="space-y-5">
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
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>

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
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

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
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B] transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-[#64748B]">Must be at least 8 characters long</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 w-4 h-4 text-[#0F4C5C] border-[#CBD5E1] rounded focus:ring-[#0F4C5C]"
                            />
                            <label htmlFor="terms" className="text-sm text-[#64748B]">
                                I agree to the{' '}
                                <Link href="#" className="text-[#0F4C5C] hover:text-[#1B7B7F] font-medium transition-colors">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link href="#" className="text-[#0F4C5C] hover:text-[#1B7B7F] font-medium transition-colors">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            onClick={onSignup}
                            disabled={isPending}
                            className="w-full bg-[#072229] text-white py-3 rounded-lg font-medium hover:bg-[#0D3F4A] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                        >
                            {isPending ? 'Signing up...' : 'Sign Up'}
                        </button>

                        <div className="text-center">
                            {state?.success && <p className="text-green-600 font-medium">{state.message || 'Signup successful'}</p>}
                            {state?.error && <p className="text-red-500 font-medium">{state.error}</p>}
                        </div>

                        {/* <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#E2E8F0]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-[#64748B]">OR</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#CBD5E1] rounded-lg hover:bg-gray-50 transition-all text-[#1E293B] font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>

                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#CBD5E1] rounded-lg hover:bg-gray-50 transition-all text-[#1E293B] font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                                Continue with Apple
                            </button>
                        </div> */}
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#64748B]">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#0F4C5C] hover:text-[#1B7B7F] font-semibold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0F4C5C] to-[#1B7B7F] items-center justify-center p-12">
                <div className="max-w-xl text-white">
                    <h2 className="text-4xl font-bold mb-8 leading-tight">
                        Revolutionize QA with<br />Smarter Automation
                    </h2>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
                        <svg className="w-10 h-10 mb-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-lg mb-6 leading-relaxed">
                            "SoftQA has completely transformed our testing process. It's reliable, efficient, and ensures our releases are always top-notch."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                MC
                            </div>
                            <div>
                                <p className="font-semibold">Michael Carter</p>
                                <p className="text-sm text-white/80">Software Engineer at DevCore</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-white/60 uppercase tracking-wider mb-6">JOIN 1K TEAMS</p>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 border border-white/10">
                                <span className="text-white font-semibold text-sm">Discord</span>
                            </div>
                            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 border border-white/10">
                                <span className="text-white font-semibold text-sm">Mailchimp</span>
                            </div>
                            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 border border-white/10">
                                <span className="text-white font-semibold text-sm">Grammarly</span>
                            </div>
                            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 border border-white/10">
                                <span className="text-white font-semibold text-sm">Attentive</span>
                            </div>
                            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 border border-white/10">
                                <span className="text-white font-semibold text-sm">Hellosign</span>
                            </div>
                            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 border border-white/10">
                                <span className="text-white font-semibold text-sm">Intercom</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}