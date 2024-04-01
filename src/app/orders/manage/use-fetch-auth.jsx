import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export const useGetSession = (msg = '') => {
  // console.log('useGetSession(): ', msg)
  const { data: session, status } = useSession()

  if (status === 'loading' || status === 'unauthenticated') {
    return { token: null, user: null, id: null, status }
  }

  // If session is null or undefined, return null values
  if (!session) {
    console.error('useGetSession(): No session found')
    return { token: null, user: null, id: null }
  }

  const { user, token } = session || {}
  const id = user?._id
  return { token, user, id, status }
}

export const useFetchAuth = (path) => {
  const url = path ? `${baseURL}${path}` : null
  const { token, id: vendorId } = useGetSession('useFetchAuth()')

  const fetcher = async (url) => {
    if (!token) {
      console.error('useFetchAuth(): No token found, logging out', { url })
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
