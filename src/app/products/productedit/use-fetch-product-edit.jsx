'use client'

import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export function useFetchProductEdit() {
  const { data: session } = useSession()
  const vendorId = session?.user?._id
  const url = vendorId ? `${baseURL}products/admin/${vendorId}` : null
  const { data, error, isLoading } = useSWR(url, fetcher)
  return { data, error, isLoading, sessionStatus: session?.status }
}
