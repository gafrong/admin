'use client'

import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { data: session } = useSession()
  const user = session?.user
  const isAuthenticated = !!user
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="pl-5 pt-5">
      {isAuthenticated && (
        <>
          <UserAvatar
            image={user?.image}
            name={user?.name}
            size={24} // 96px
          />
          <div className="mt-4">성함: {user?.name}</div>
          <div className="mt-2">사용자명: @{user?.username}</div>
          <div className="mt-2">이메일: {user?.email}</div>
          <div className="mt-2">브랜드: {user?.brand}</div>
          <div className="mt-2">브랜드 설명: {user?.brandDescription}</div>
          <Button className="mt-12" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </div>
  )
}
