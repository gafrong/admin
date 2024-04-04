import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export const useFetchAuth = (path) => {
  const url = path ? `${baseURL}${path}` : null
  const { data: session } = useSession()
  const token = session?.token
  const vendorId = session?.user?._id

  const fetcher = async (url) => {
    if (!token) {
      console.error('useFetchAuth(): No token found, logging out', {
        url,
        token,
        session,
      })
    }
    const data = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
    return data
  }

  // swr will not fetch if url is null, ie if token is not present
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)
  if (error) {
    console.error('useFetchAuth() error:', { error, url })
  }
  return {
    data,
    error,
    isLoading,
    mutate,
    vendorId,
  }
}
