'use client'

import { useFetchAuth } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { columns } from './columns-order-items'

// clients/search
// clients/search/123
// clients/search/123/product/123

export function TableOrderItems({ clientId }) {
  const { data: session } = useSession()
  const vendorId = session?.user?._id
  const url = vendorId ? `orders/get/adminorders/${vendorId}` : null
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
    />
  )
}
