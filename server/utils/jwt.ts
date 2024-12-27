import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export function signJWT(payload: object, expiresIn = '1d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyJWT<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
} 