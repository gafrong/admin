// useFetchOrders.js
import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchOrders = () => {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const [isLoading, setIsLoading] = useState(false)
  const [orderItems, setOrderItems] = useState([])
  const vendorId = user?._id
  const [isFetchTriggered, setFetchTrigger] = useState(false)
  const setStoreOrderItems = useUserStore((state) => state.setStoreOrderItems)

  const getOrderItemsByVendorId = async () => {
    setIsLoading(true)
    const URL = `${baseURL}orders/get/adminorders/${vendorId}`
    try {
      const response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setOrderItems(response.data)
      setStoreOrderItems(response.data)
    } catch (error) {
      console.log('getOrderItemsByVendorId() error', { URL }, error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    token && getOrderItemsByVendorId()
  }, [token, isFetchTriggered])

  const refetchTableData = () => {
    setFetchTrigger((prev) => !prev)
  }

  return { orderItems, isLoading, refetchTableData, vendorId }
}
