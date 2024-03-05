'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders, updateTableData } from './columns'
import { statuses } from './data/data'

export function ManageOrders() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const [isLoading, setIsLoading] = useState(false)
  const [orderItems, setOrderItems] = useState([])
  const vendorId = user?._id
  const [isFetchTriggered, setFetchTrigger] = useState(false)

  const getOrderItemsByVendorId = async () => {
    setIsLoading(true)
    const URL = `${baseURL}orders/get/adminorders/${vendorId}`
    try {
      const response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      setOrderItems(response.data)
    } catch (error) {
      console.log('getOrderItemsByVendorId() error', { URL }, error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    token && getOrderItemsByVendorId()
  }, [token, isFetchTriggered])

  const refetchTableData = () => {
    setFetchTrigger((prev) => !prev)
  }

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
