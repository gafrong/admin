'use client'

import { useFetchOrderItems } from '@/app/fetch/use-fetch-order-items'
import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns } from './columns'
import { statuses } from './data/data'

export function TableManageOrders() {
  const { data, isLoading, mutate } = useFetchOrderItems()
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
      data={data}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={mutate}
    />
  )
}
