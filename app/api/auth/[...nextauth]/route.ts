import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import type { User } from "@/types"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import { authService } from "@/server/services/auth.service"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await authService.validateCredentials(
            credentials.email,
            credentials.password
          );

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            username: user.username,
            fullName: user.fullName,
            role: user.role || 'USER',
            isActivated: !!user.emailVerified,
            followingCount: user.followingCount,
            followersCount: user.followersCount,
            emailVerified: user.emailVerified,
            image: user.image
          };
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.fullName = user.fullName;
        token.isActivated = user.isActivated;
        token.followingCount = user.followingCount;
        token.followersCount = user.followersCount;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.fullName = token.fullName;
        session.user.isActivated = token.isActivated;
        session.user.followingCount = token.followingCount;
        session.user.followersCount = token.followersCount;
        session.user.emailVerified = token.emailVerified;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST, authOptions }

