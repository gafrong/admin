import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

export const useFetchAuth = (path) => {
  const token = useUserStore((state) => state?.token)
  const vendorId = useUserStore((state) => state.user)?._id
  const url = `${baseURL}${path}`
  const clearUser = useUserStore((state) => state.clearUser)
  const router = useRouter()
  const logout = () => {
    router.push('/')
    clearUser()
  }
  const fetcher = async (url) => {
    if (!token) {
      logout()
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
    console.error('Fetch error:', { error, url })
  }
  return {
    data,
    error,
    isLoading,
    mutate,
    vendorId,
  }
}
