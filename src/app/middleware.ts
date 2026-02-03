
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;

  
  if (pathname.startsWith('/admin')) {
    
    if (!token || userRole?.toUpperCase() !== 'ADMIN') {
    
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: '/admin/:path*',
};