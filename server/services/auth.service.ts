import { hash, compare } from 'bcryptjs';
import { prisma } from '../lib/config/database';
import { generateToken } from '../utils/jwt';
import { ApiError } from '../utils/errors';
import type { User } from '@/types';

export class AuthService {
  async signup(email: string, password: string, name: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ApiError('AUTH_ERROR', 'Email already exists');
    }

    const hashedPassword = await hash(password, 12);
    const verificationToken = generateToken();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
      }
    });

    // Send verification email here
    
    return { userId: user.id };
  }

  async verifyEmail(token: string) {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    });

    if (!user) {
      throw new ApiError('AUTH_ERROR', 'Invalid verification token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      }
    });

    return true;
  }

  async resetPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new ApiError('AUTH_ERROR', 'User not found');
    }

    const resetToken = generateToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      }
    });

    // Send reset password email here

    return true;
  }

  async validateResetToken(token: string) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new ApiError('AUTH_ERROR', 'Invalid or expired reset token');
    }

    return true;
  }

  async updatePassword(token: string, newPassword: string) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new ApiError('AUTH_ERROR', 'Invalid or expired reset token');
    }

    const hashedPassword = await hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    });

    return true;
  }

  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      return null;
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      username: user.username,
      fullName: user.fullName || '',
      role: user.role,
      isActivated: !!user.emailVerified,
      followingCount: user.followingCount,
      followersCount: user.followersCount,
      emailVerified: user.emailVerified,
      image: user.image
    };
  }
}

export const authService = new AuthService();
