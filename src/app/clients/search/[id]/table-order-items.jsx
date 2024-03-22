'use client'

import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { useFetchOrders } from '../use-fetch-orders'
import { columns, updateTableData } from './columns-order-items'

export function TableOrderItems({ clientId }) {
  const { orderItems, isLoading, mutate } = useFetchOrders()
  const clientOrderItems =
    orderItems?.length &&
    orderItems.filter((item) => item.buyer._id === clientId)

  const controls = {}

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
