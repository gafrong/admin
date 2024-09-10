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
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Authentication error. Please login again.')
        // TODO: trigger a logout or token refresh here
        return { error: 'Authentication failed' }
      } else {
        console.error('useFetchAuth() error:', { error, url })
        return { error: 'An error occurred while fetching data' }
      }
    }
  }

  // useSWR() uses isLoading, useSession uses status === 'loading'
  // swr will not fetch if url is null, ie if token is not present
  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })

  const apiError = data?.error || null
  const error = swrError || apiError

  return {
    data: apiError ? null : data,
    error,
    isLoading,
    mutate,
    vendorId,
  }
}
