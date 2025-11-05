import { NextResponse } from 'next/server';


export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Skip API routes (allow public access to API endpoints like /admin/api/login)
    if (path.startsWith('/api') || path.startsWith('/admin/api') || path.startsWith('/user/api')) {
        return NextResponse.next();
    }

    // Public routes
    const isPublicUser = path === '/login' || path === '/signup' || path === '/verifyEmail';
    const isPublicAdmin = path === '/admin/login' || path === '/admin/sign-up';

    // Scoped protected routes
    const isAdminRoute = path.startsWith('/admin') && !isPublicAdmin;
    const isUserRoute = path.startsWith('/user') && !isPublicUser;

    // Cookies (httpOnly) set by your API routes
    const userToken = request.cookies.get('token')?.value;
    const adminToken = request.cookies.get('adminToken')?.value;

    // Protect admin routes
    if (isAdminRoute && !adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Protect user routes
    if (isUserRoute && !userToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/admin/login',
        '/admin/sign-up',
        '/user/:path*',
        '/login',
        '/signup',
        '/verifyEmail',
    ]
}

