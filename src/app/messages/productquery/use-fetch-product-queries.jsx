'use client'

import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import useSWR from 'swr'

export function useFetchProductQueries() {
  const token = useUserStore((state) => state?.token)
  const seller = useUserStore((state) => state.user)
  const sellerId = seller?._id

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)

  const url = `${baseURL}questions/vendor/${sellerId}`
  const { data: questions, error, mutate } = useSWR(url, fetcher)

  return { questions, mutate, isLoading: !questions && !error }
}
