import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ১. কুকি থেকে টোকেন এবং রোল বের করা
  console.log("==> Middleware running for:", request.nextUrl.pathname);
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;

  // ২. যদি ইউজার /admin এর কোনো পেজে যেতে চায়
  if (pathname.startsWith('/admin')) {
    // যদি লগইন না থাকে বা অ্যাডমিন না হয়, তবে তাকে হোম পেজে পাঠাও
    if (!token || userRole?.toUpperCase() !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// ৩. এই ফিল্টারটি নিশ্চিত করবে মিডলওয়্যার শুধু অ্যাডমিন রাউটে কাজ করবে
export const config = {
  matcher: ['/admin/:path*'],
};
