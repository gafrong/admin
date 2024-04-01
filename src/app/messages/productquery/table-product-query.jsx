'use client'

import { useFetchAuth, useGetSession } from '@/app/orders/manage/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns } from './columns'

export function TableProductQuery() {
  const { id: sellerId } = useGetSession('TableProductQuery()')
  const url = sellerId ? `questions/vendor/${sellerId}` : null
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
