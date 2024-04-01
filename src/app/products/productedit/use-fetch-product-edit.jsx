'use client'

import { useGetSession } from '@/app/orders/manage/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export function useFetchProductEdit() {
  const { id: vendorId } = useGetSession('useFetchProductEdit()')
  const url = vendorId ? `${baseURL}products/admin/${vendorId}` : null
  const { data, error, isLoading } = useSWR(url, fetcher)
  return { data, error, isLoading }
}
