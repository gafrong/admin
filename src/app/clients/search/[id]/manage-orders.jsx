'use client'

import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns, updateTableData } from './columns-manage-orders'
import { useFetchOrders } from './use-fetch-orders'

export function ManageOrders() {
  const { orderItems, isLoading, refetchTableData } = useFetchOrders()

  const controls = {}

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={orderItems}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchTableData}
      updateTableData={updateTableData}
    />
  )
}
