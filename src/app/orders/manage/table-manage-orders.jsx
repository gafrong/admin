'use client'

import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import React from 'react'
import { columns } from './columns'
import { statuses } from './data/data'
import { useFetchAuth } from './use-fetch-auth'

export function TableManageOrders() {
  const vendorId = useUserStore((state) => state.user)?._id
  const url = `orders/get/adminorders/${vendorId}`
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
