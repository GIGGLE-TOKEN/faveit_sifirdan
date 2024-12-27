import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { User } from "@/types"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: { email: string; password: string } | undefined) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }

        try {
          if (credentials.email === "user@example.com" && credentials.password === "password") {
            const user: User = {
              id: "1",
              email: credentials.email,
              username: "testuser",
              fullName: "Test User",
              followingCount: 0,
              followersCount: 0,
              isActivated: true
            }
            return user
          }
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: User }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.fullName
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  }
} 