import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    role: string
    accessToken?: string
  }

  interface Session {
    user: {
      id: string
      role: string
      email: string
      accessToken?: string 
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    email?: string | null
  }
}