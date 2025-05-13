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
      const baseUrl =
        req.nextUrl.origin ||
        `https://${req.headers.get('host')}` ||
        process.env.NEXT_PUBLIC_FRONTEND_URL;
      return NextResponse.redirect(new URL('/home', baseUrl));
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
  const baseUrl =
    req.nextUrl.origin ||
    `https://${req.headers.get('host')}` ||
    process.env.NEXT_PUBLIC_FRONTEND_URL;

  return NextResponse.redirect(new URL('/login', baseUrl));
}

// specify on which routes you want to run the middleware
export const config = {
  matcher: ['/users/:path*', '/login/:path*', '/signup/:path*'],
};
