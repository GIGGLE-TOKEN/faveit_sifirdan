import 'next-auth'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    fullName: string
    email: string
    isActivated: boolean
    followingCount: number
    followersCount: number
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
}

// For JWT
declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
  }
}
