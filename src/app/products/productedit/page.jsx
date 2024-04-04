'use client'

import { protectRoute } from '@/app/(auth)/_components/protect-route'
import { DataTable } from '@/components/data-table/data-table'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import React from 'react'
import { columns } from './columns'
import { useFetchProductEdit } from './use-fetch-product-edit'

const dateRangePicker = 'dateCreated'
export const searchableColumnHeaders = [{ id: 'name', label: 'Name' }]

function Page() {
  const { data, isLoading } = useFetchProductEdit()

  return (
    <PageContainer>
      <PageTitle>제품 편집</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker, searchableColumnHeaders }}
        data={data}
        isLoading={isLoading}
      />
    </PageContainer>
  )
}

export default protectRoute(Page, 'products/productedit')
