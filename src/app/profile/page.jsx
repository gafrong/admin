'use client'

import awsURL from '@/assets/common/awsUrl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/zustand'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const user = useUserStore((state) => state.user)
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const clearUser = useUserStore((state) => state.clearUser)
  const avatar = awsURL + user?.image
  const router = useRouter()
  const handleLogout = () => {
    router.push('/')
    clearUser()
  }
  return (
    <div className="pl-5 pt-5">
      {isAuthenticated && (
        <>
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage src={avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>{user?.name}</div>
          <div>@{user?.username}</div>
          <div>{user?.email}</div>
          <div>{user?.brandDescription}</div>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </div>
  )
}
