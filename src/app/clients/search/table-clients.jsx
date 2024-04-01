'use client'

import { useFetchAuth, useGetSession } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders } from './columns'

const unique = (arrayWithDuplicates) => [...new Set(arrayWithDuplicates)]

const getClients = ({ orderItems = [], vendorId }) => {
  const clientOrderItems = orderItems.filter(
    (item) => item.sellerId === vendorId,
  )
  const buyers = clientOrderItems.map((item) => item.buyer)
  const ids = unique(buyers.map((buyer) => buyer.id))
  const getBuyerById = (id) => buyers.find((buyer) => buyer.id === id)
  const clients = ids.map(getBuyerById)
  return clients
}

export function TableClients() {
  const [users, setUsers] = useState([])
  const setStoreClients = useUserStore((state) => state.setClients)
  const { id: vendorId } = useGetSession('TableClients()')
  const url = vendorId ? `orders/get/adminorders/${vendorId}` : null
  const { data: orderItems, isLoading, mutate } = useFetchAuth(url)

  useEffect(() => {
    const clients = getClients({ orderItems, vendorId })
    setStoreClients(clients)
    setUsers(clients)
  }, [orderItems, vendorId, setStoreClients])

  const controls = {
    isSearchAlwaysShown: true,
    searchableColumnHeaders,
  }

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={users}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={mutate}
    />
  )
}
