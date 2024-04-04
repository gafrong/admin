'use client'

import { useFetchOrderItems } from '@/app/fetch/use-fetch-order-items'
import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns } from './columns'

export function TableClientOrders({ productId, clientId }) {
  const {
    data: orderItems,
    isLoading: isLoadingOrderItems,
    mutate,
    sessionStatus,
  } = useFetchOrderItems()
  const findClientItems = (item) => item.buyer._id === clientId
  const findClientOrder = (order) => order.product._id === productId

  const clientOrderItems = orderItems?.filter(findClientItems)
  const clientOrder = clientOrderItems?.find(findClientOrder)
  const isLoading = sessionStatus === 'loading' || isLoadingOrderItems
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
