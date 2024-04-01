'use client'

import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns } from './columns'
import { statuses } from './data/data'
import { useFetchAuth, useGetSession } from './use-fetch-auth'

export function TableManageOrders() {
  const { id: vendorId } = useGetSession('TableManageOrders()')
  const url = vendorId ? `orders/get/adminorders/${vendorId}` : null
  const { data, isLoading, mutate } = useFetchAuth(url)

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
