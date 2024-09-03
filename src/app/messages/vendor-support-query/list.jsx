'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { DataTable } from '@/components/data-table/data-table'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { useVendorSupportQueries } from '@/lib/api'
import { getColumns, controls } from './columns'

export function SupportQueryList() {
  const { data: session } = useSession()
  const { data: queries, isLoading, mutate: refetchQueries } = useVendorSupportQueries(session?.user?.id)

  const columns = getColumns()

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={queries}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchQueries}
    />
  )
}

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>Support Queries</PageTitle>
      <SupportQueryList />
    </PageContainer>
  )
}
