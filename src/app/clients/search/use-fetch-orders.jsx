// useFetchOrders.js
import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import useSWR from 'swr'

export const useFetchOrders = () => {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const vendorId = user?._id
  const url = `${baseURL}orders/get/adminorders/${vendorId}`

  const fetcher = async (url) => {
    if (!token)
      throw new Error('No user token! Not authorized to fetch order items')

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // swr will not fetch if url is null, ie if token is not present
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    isLoading,
    mutate,
    orderItems: data,
    vendorId,
  }
}
