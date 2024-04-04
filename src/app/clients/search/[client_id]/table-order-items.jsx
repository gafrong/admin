'use client'

import { useFetchOrderItems } from '@/app/fetch/use-fetch-order-items'
import { DataTable } from '@/components/data-table/data-table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { columns } from './columns-order-items'

// clients/search
// clients/search/123
// clients/search/123/product/123

export function useGetClientOrderItems({ clientId }) {
  const [clientOrderItems, setClientOrderItems] = useState([])
  const { data: orderItems, isLoading, mutate } = useFetchOrderItems()

  useEffect(() => {
    if (!isLoading && orderItems) {
      const filterByClient = (item) => item.buyer._id === clientId
      const filteredItems = orderItems.filter(filterByClient)
      setClientOrderItems(filteredItems)
    }
  }, [isLoading, orderItems, clientId])

  return { clientOrderItems, isLoading, mutate }
}

const getPageURL = ({ row }) => {
  const buyerId = row.original.buyer._id
  const productId = row.original.product._id
  return `/clients/search/${buyerId}/product/${productId}`
}

export function TableOrderItems({ clientId }) {
  const router = useRouter()
  const { clientOrderItems, isLoading, mutate } = useGetClientOrderItems({
    clientId,
  })

  const controls = {
    onRowClick: ({ row }) => {
      router.push(getPageURL({ row }))
    },
  }

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={clientOrderItems}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={mutate}
    />
  )
}
