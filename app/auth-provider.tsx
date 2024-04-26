"use client"
import { AuthProvider } from 'firebase/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function UserAuthProvider({ children }: { children: React.ReactNode }) {

  return (
      <SessionProvider session={null}>
        {children}
      </SessionProvider>
  )
}
