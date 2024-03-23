'use client'

import { useFetchAuth } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import React from 'react'
import { columns } from './columns'

export function TableProductQuery() {
  const sellerId = useUserStore((state) => state.user)?._id
  const url = `questions/vendor/${sellerId}`
  const { data, isLoading } = useFetchAuth(url)
  const dateRangePicker = 'dateCreated'
  const searchableColumnHeaders = [
    { id: 'title', label: '날짜', placeholder: '검색 날짜...' },
  ]

  return (
    <DataTable
      columns={columns}
      controls={{
        dateRangePicker,
        searchableColumnHeaders,
      }}
      data={data}
      isLoading={isLoading}
    />
  )
}
