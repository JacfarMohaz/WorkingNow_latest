import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Assume a cookie `auth_token` indicates the user is logged in
  const authToken = request.cookies.get('auth_token')?.value;

  // const { pathname } = request.nextUrl;

  // If user is not authenticated and trying to access a protected route
  if (!authToken) {
    // Redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If user is authenticated, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}; 