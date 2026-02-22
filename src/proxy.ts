import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PROTECTED = /^\/admin(?:\/(?!$).*)?$/;
const LOGIN_PAGE = '/admin';
const COOKIE = 'admin_session';

function getSecret(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET ?? 'change-this-in-production-32chars!!';
  return new TextEncoder().encode(s);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin/* but allow the login page itself
  if (!PROTECTED.test(pathname) || pathname === LOGIN_PAGE) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE)?.value;

  if (token) {
    try {
      await jwtVerify(token, getSecret());
      return NextResponse.next();
    } catch {
      // invalid / expired
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = LOGIN_PAGE;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
