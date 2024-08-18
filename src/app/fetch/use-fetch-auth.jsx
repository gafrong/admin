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
    console.log(`useFetchAuth(): ${token ? 'A' : 'No'} token found for ${url}`)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.get(url, { headers })
      console.log('useFetchAuth() url:', { url })
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // TODO: Handle 401 Unauthorized error, e.g., redirect to login or refresh token
        console.error('Authentication error. Please login again.')
      } else {
        console.error('useFetchAuth() error:', { error, url })
      }
      return null
    }
  }

  // useSWR() uses isLoading, useSession uses status === 'loading'
  // swr will not fetch if url is null, ie if token is not present
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })
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
