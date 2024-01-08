'use client'

import { Button } from '@/components/ui/button'
import useUserStore from '@/store/zustand'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)
  const handleLogout = () => {
    router.push('/')
    clearUser()
  }
  return (
    <div className="pl-5 pt-5">
      <h1 className="mb-12 mt-8 text-3xl text-blue-500">환영합니다!</h1>
      <p>
        판매자님의 사업자 정보는 잘 전달되었으며 현재 검토 중입니다. 검토가
        완료되면 이메일 메시지가 발송될 예정입니다. 감사합니다.
      </p>

      <Button className="mt-8" onClick={handleLogout}>
        나가기
      </Button>
    </div>
  )
}
