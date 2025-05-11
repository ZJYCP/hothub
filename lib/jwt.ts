const JWT_SECRET = process.env.OPEN_API_JWT_SECRET || 'your-secret';

import { jwtVerify, SignJWT, JWTPayload } from 'jose';

// 使用 jose 生成 JWT
export async function signJwt(payload: object, expiresIn: string | number) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  // 创建一个新的 SignJWT 实例
  const jwt = await new SignJWT(payload as JWTPayload)
    .setExpirationTime(expiresIn) // 设置过期时间
    .setIssuedAt() // 设置签发时间
    .setProtectedHeader({ alg: 'HS256' }) // 设置加密算法和头部信息
    .sign(secret);
  return jwt;
}

// 使用 jose 验证 JWT
export async function verifyJwt<T>(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret); // jose 验证 token
    return payload as T;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}
