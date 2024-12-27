import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: string
    username: string
    emailVerified: Date | null
    image?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      username: string
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    username: string
    fullName: string
    isActivated: boolean
    followingCount: number
    followersCount: number
    emailVerified: Date | null
  }
} 