'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import { useSession } from 'next-auth/react'
import React from 'react'
import { columns } from './columns'

export function TableProductQuery() {
  const { data: session } = useSession()
  const sellerId = session?.user?._id
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
