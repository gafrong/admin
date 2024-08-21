'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { useSession } from 'next-auth/react'

export const useFetchUserById = (userId) => {
  const { data: session, status: sessionStatus } = useSession()
  const url = userId ? `/users/${userId}` : null
  const fetchResponse = useFetchAuth(url)
  return { userId, user: session?.user, ...fetchResponse, sessionStatus }
}
