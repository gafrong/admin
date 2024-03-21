'use client'

import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns, updateTableData } from './columns'
import { statuses } from './data/data'
import { useFetchOrderItems } from './use-fetch-order-items'

export function TableManageOrders() {
  const { orderItems, isLoading, refetchTableData } = useFetchOrderItems()

  const searchableColumnHeaders = [{ id: 'orderNumber', label: 'Order Number' }]

  const filterByCategory = {
    categories: statuses,
    categoryHeader: 'orderStatus',
  }

  const controls = {
    dateRangePicker: 'dateOrdered',
    filterByCategory,
    searchableColumnHeaders,
  }

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
