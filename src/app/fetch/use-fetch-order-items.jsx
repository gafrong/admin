'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { useSession } from 'next-auth/react'

// const { vendorId, data: orderItems, isLoading, mutate } = useFetchOrderItems()
export const useFetchOrderItems = () => {
  const { data: session, status: sessionStatus } = useSession()
  const vendorId = session?.user?._id
  const url = vendorId ? `orders/get/adminorders/${vendorId}` : null
  const fetchResponse = useFetchAuth(url)
  return { vendorId, user: session?.user, ...fetchResponse, sessionStatus }
}
