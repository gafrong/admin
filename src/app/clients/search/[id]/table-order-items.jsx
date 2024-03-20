'use client'

import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns, updateTableData } from './columns-order-items'
import { useFetchOrders } from './use-fetch-order-items'

export function TableOrderItems({ clientId }) {
  const { orderItems, isLoading, refetchTableData } = useFetchOrders()
  const clientOrderItems = orderItems.filter(
    (item) => item.buyer._id === clientId,
  )

  const controls = {}

  return (
    <DataTable
      key={clientOrderItems.length}
      columns={columns}
      controls={controls}
      data={clientOrderItems}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchTableData}
      updateTableData={updateTableData}
    />
  )
}
