'use client'

import { useEffect } from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useUserStore from '../store/zustand'
import NextAuthProvider from './provider'
import styles from './utils.module.css'

export default function RootLayout({ children }) {
  const user = useUserStore((state) => state?.user)
  const token = useUserStore((state) => state?.token)
  const isAuthenticated = useUserStore((state) => state?.isAuthenticated)

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router?.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <html>
      <head />
      <body>
        <Navbar />
        {user?.verified && (
          <div
            className={`w-34 fixed m-0 mt-16 h-full overflow-auto border-r border-slate-300 p-0`}
          >
            <Sidebar />
          </div>
        )}
        <NextAuthProvider>
          <div className={styles.content}>{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
