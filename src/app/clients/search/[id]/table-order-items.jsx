'use client'

import { useFetchAuth } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import { useRouter } from 'next/navigation'
import React from 'react'
import { columns, updateTableData } from './columns-order-items'

// clients/search
// clients/search/123
// clients/search/123/product/123

export function TableOrderItems({ clientId }) {
  const vendorId = useUserStore((state) => state.user)?._id
  const url = `orders/get/adminorders/${vendorId}`
  const { data: orderItems, isLoading, mutate } = useFetchAuth(url)
  const findClient = (item) => item.buyer._id === clientId
  const clientOrderItems = orderItems?.filter(findClient)
  const router = useRouter()
  const controls = {
    onRowClick: (props) => {
      const { row } = props
      const buyerId = row.original.buyer._id
      const productId = row.original.product._id
      router.push(`/clients/search/${buyerId}/product/${productId}`)
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
      updateTableData={updateTableData}
    />
  )
}
