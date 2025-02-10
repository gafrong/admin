import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export const useFetchAuth = (path) => {
  const { data: session } = useSession()
  const token = session?.token
  const url = path ? `${baseURL}${path}` : null

  const fetcher = async (url) => {
    if (!token) {
      throw new Error('No authentication token found')
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    try {
      const response = await axios.get(url, { headers })
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Authentication required')
      }
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Request error:', error.message)
      }
      throw error
    }
  }

  // useSWR() uses isLoading, useSession uses status === 'loading'
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })
}
