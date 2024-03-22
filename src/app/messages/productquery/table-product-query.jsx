'use client'

import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns } from './columns'
import { useFetchProductQueries } from './use-fetch-product-queries'

export function TableProductQuery() {
  const { questions, mutate, isLoading } = useFetchProductQueries()
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
      data={questions}
      isLoading={isLoading}
    />
  )
}
