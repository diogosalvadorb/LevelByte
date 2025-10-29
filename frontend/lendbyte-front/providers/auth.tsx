"use client";

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export const AuthProvider = ({ children }: SessionProviderProps) => {
  return (
    <SessionProvider 
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  )
}