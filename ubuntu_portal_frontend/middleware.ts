import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const isProtectedRoute = req.nextUrl.pathname.startsWith(
    '/supplier/dashboard'
  );

  // If no token and it's a protected route, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Handle role-based access
  if (token) {
    if (token.role === 'buyer') {
      // If the user is a buyer, prevent access to the seller dashboard
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/home', req.url)); // Redirect buyer to their homepage
      }
    } else if (token.role !== 'supplier') {
      // If the user is neither a seller nor a buyer, redirect to login
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // If the user is authenticated and has the correct role, allow access
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/supplier/:path*'], // Matches all routes inside the supplier directory
};
