'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

export const ProviderAuth = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
