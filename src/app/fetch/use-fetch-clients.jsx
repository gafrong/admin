'use client'

import { useFetchOrderItems } from './use-fetch-order-items'

const unique = (arrayWithDuplicates) => [...new Set(arrayWithDuplicates)]

const getClients = ({ orderItems = [], vendorId }) => {
  const findVendorItems = (item) => item.sellerId === vendorId
  const clientOrderItems = orderItems.filter(findVendorItems)
  const buyers = clientOrderItems.map((item) => item.buyer)
  const ids = unique(buyers.map((buyer) => buyer.id))
  const getBuyerById = (id) => buyers.find((buyer) => buyer.id === id)
  const clients = ids.map(getBuyerById)
  return clients
}

export const useFetchClients = () => {
  const { vendorId, data: orderItems, isLoading, mutate } = useFetchOrderItems()
  const clients = getClients({ orderItems, vendorId })
  return { clients, isLoading, refetchClients: mutate }
}
