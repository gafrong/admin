'use client'

import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import React from 'react'
import { columns } from './columns'
import { useFetchProductEdit } from './use-fetch-product-edit'

const dateRangePicker = 'dateCreated'
export const searchableColumnHeaders = [{ id: 'name', label: 'Name' }]

export default function Page() {
  const { data, isLoading } = useFetchProductEdit()

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>제품 편집</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker, searchableColumnHeaders }}
        data={data}
        isLoading={isLoading}
      />
    </div>
  )
}
