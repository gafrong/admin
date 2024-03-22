'use client'

import { useFetchOrders } from '@/app/clients/search/use-fetch-orders'
import { DataTable } from '@/components/data-table/data-table'
import React, { useEffect, useState } from 'react'
import { columns, updateTableData } from './columns'
import { statuses } from './data/data'

export function TableManageOrders() {
  const [orders, setOrders] = useState([])
  const { orderItems, isLoading, mutate } = useFetchOrders()

  useEffect(() => {
    orderItems?.length && setOrders(orderItems)
  }, [orderItems])

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
      data={orders}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={mutate}
      updateTableData={updateTableData}
    />
  )
}
