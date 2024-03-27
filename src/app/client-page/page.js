'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
  const { data: session } = useSession()
  if (!session || !session.user)
    return <div className="p-5 text-red-500">You Need To Sign In</div>
  return <div>This is a client page and must be protected</div>
}

export default Page
