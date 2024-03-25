'use client'

import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export function useFetchProductEdit() {
  const vendorId = useUserStore((state) => state.user)?._id
  const url = `${baseURL}products/admin/${vendorId}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return { data, error, isLoading }
}
