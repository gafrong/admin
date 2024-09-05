import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export const useFetchAuth = (path, options = {}) => {
  const url = path ? `${baseURL}${path}` : null
  const { data: session } = useSession()
  const token = session?.token
  const userId = session?.user?._id
  const userRole = session?.user?.role

  const fetcher = async (url, method = 'GET', data = null) => {
    console.log(`useFetchAuth(): ${token ? 'A' : 'No'} token found for ${url}`)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    if (userRole === 'superAdmin') {
      headers['X-User-Role'] = 'superAdmin'
    }
    try {
      const config = {
        method,
        url,
        headers,
        data: data ? JSON.stringify(data) : undefined,
      }
      const response = await axios(config)
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // TODO: Handle 401 Unauthorized error, e.g., redirect to login or refresh token
        console.error('Authentication error. Please login again.')
      } else {
        console.error('useFetchAuth() error:', { error, url })
      }
      throw error
    }
  }

  const { data, error, isLoading, mutate } = useSWR(
    url ? [url, options.method, options.data] : null,
    ([url, method, data]) => fetcher(url, method, data),
    {
      revalidateOnFocus: false,
      ...options,
    }
  )

  if (error) {
    console.error('useFetchAuth() error:', { error, url })
  }

  const executeRequest = async (method, data) => {
    try {
      const result = await fetcher(url, method, data)
      mutate()
      return result
    } catch (error) {
      console.error('executeRequest error:', error)
      throw error
    }
  }

  return {
    data,
    error,
    isLoading,
    mutate,
    vendorId,
    executeRequest,
  }
}
