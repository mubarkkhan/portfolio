import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('admMKey')?.value;

  const isProtectedRoute = req.nextUrl.pathname.startsWith('/Admin') && !req.nextUrl.pathname.startsWith('/Admin/Auth');

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/Admin/Auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Admin/:path*'],
};
