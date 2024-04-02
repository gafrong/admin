'use client'

import { useFetchAuth } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import { useSession } from 'next-auth/react'
import React from 'react'
import { columns } from './columns'

export function TableClientOrders({ productId, clientId }) {
  const { data: session } = useSession()
  const vendorId = session.user?._id
  const url = vendorId ? `orders/get/adminorders/${vendorId}` : null
  const { data: orderItems, isLoading, mutate } = useFetchAuth(url)
  const findClient = (item) => item.buyer._id === clientId
  const clientOrderItems = orderItems?.filter(findClient)
  const clientOrder = clientOrderItems?.find(
    (order) => order.product._id === productId,
  )

  const searchableColumnHeaders = [{ id: 'orderNumber', label: 'Order Number' }]
  const controls = { searchableColumnHeaders }

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={[clientOrder]}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={mutate}
    />
  )
}
