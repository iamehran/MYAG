import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE = 'admin_session';

function getSecret(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET ?? 'change-this-in-production-32chars!!';
  return new TextEncoder().encode(s);
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export { COOKIE };
