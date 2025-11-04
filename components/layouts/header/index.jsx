"use client"
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="bg-primary sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-tertiary">SoftQA</h1>
                    </Link>
                    {/* <nav className="hidden md:flex items-center gap-10">
                            <Link href="/" className="text-tertiary hover:border-b-2 transition-colors">Home</Link>
                            <Link href="/about" className="text-tertiary hover:border-b-2 transition-colors">About</Link>
                            <Link href="/contact" className="text-tertiary hover:border-b-2 transition-colors">Contact</Link>
                        </nav> */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/admin/login" className="text-tertiary border-b-2 border-tertiary px-5 py-2.5 rounded-full font-inter hover:border-transparent transition">Admin</Link>
                        <Link href="/login" className="text-tertiary border-b-2 border-tertiary px-5 py-2.5 rounded-full font-inter hover:border-transparent transition">Login</Link>
                        <Link href="/signup" className="text-tertiary border-b-2 border-tertiary px-5 py-2.5 rounded-full font-inter hover:border-transparent transition">Signup</Link>
                    </div>
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-tertiary hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                        <svg className={`${mobileOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg className={`${mobileOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                id="mobile-nav"
                className={`${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-out bg-primary/95 backdrop-blur`}
            >
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex flex-col gap-4">
                        <Link onClick={() => setMobileOpen(false)} href="/" className="text-tertiary hover:text-tertiary transition-colors">Home</Link>
                        <Link onClick={() => setMobileOpen(false)} href="/about" className="text-tertiary hover:text-tertiary transition-colors">About</Link>
                        <Link onClick={() => setMobileOpen(false)} href="/contact" className="text-tertiary hover:text-tertiary transition-colors">Contact</Link>
                        <div className="mt-2 flex flex-col gap-3">
                            <Link onClick={() => setMobileOpen(false)} href="/admin" className="text-white bg-tertiary px-5 py-2.5 rounded-full font-inter text-center hover:opacity-90 transition">Admin</Link>
                            <Link onClick={() => setMobileOpen(false)} href="/login" className="text-white bg-tertiary px-5 py-2.5 rounded-full font-inter text-center hover:opacity-90 transition">Login</Link>
                            <Link onClick={() => setMobileOpen(false)} href="/signup" className="text-white bg-tertiary px-5 py-2.5 rounded-full font-inter text-center hover:opacity-90 transition">Signup</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}