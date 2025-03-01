import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const {
    nextUrl: { pathname },
  } = req;

  // Check if the user is authenticated
  if (token) {
    // Redirect authenticated users away from sign-in and sign-up pages
    if (pathname.includes('/login') || pathname.includes('/signup')) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
    // Allow access to protected routes
    return NextResponse.next();
  }

  // Allow access to sign-in and sign-up pages for unauthenticated users
  if (
    pathname.includes('/login') ||
    pathname.includes('/signup') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  return NextResponse.redirect(new URL('/login', req.url));
}

// specify on which routes you want to run the middleware
export const config = {
  matcher: ['/users/:path*', '/login/:path*', '/signup/:path*'],
};
