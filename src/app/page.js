'use client'

import Login from '@/components/Login'
import useUserStore from '@/store/zustand'
import { Divide } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const user = useUserStore((state) => state.user)
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  return (
    <main className="ml-[-120px] grid min-h-screen place-items-center">
      {isAuthenticated ? (
        <div>
          <p>You are logged in</p>
        </div>
      ) : (
        <div className='text-center'>
          <Login />
          <Link href="/reset-password">
            <p className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-sm self-center justify-self-center'>비밀번호 재설정</p>
          </Link>
        </div>
      )}
      {user && <p>{user?.email}</p>}
    </main>
  )
}
