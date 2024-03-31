'use client'

import awsURL from '@/assets/common/awsUrl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/zustand'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { user } = useUserStore((state) => state)
  const isAuthenticated = !!user
  const avatar = awsURL + user?.image
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="pl-5 pt-5">
      {isAuthenticated && (
        <>
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage src={avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
