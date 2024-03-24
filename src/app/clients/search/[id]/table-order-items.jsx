'use client'

import { useFetchAuth } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import React from 'react'
import { columns, updateTableData } from './columns-order-items'

export function TableOrderItems({ clientId }) {
  const vendorId = useUserStore((state) => state.user)?._id
  const url = `orders/get/adminorders/${vendorId}`
  const { data: orderItems, isLoading, mutate } = useFetchAuth(url)
  const findClient = (item) => item.buyer._id === clientId
  const clientOrderItems = orderItems?.filter(findClient)

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
