'use client'

import { DataTable } from '@/components/data-table/data-table'
import { useVendorSupportQueries } from '@/lib/api'
import { useSession } from 'next-auth/react'
import React from 'react'
import { controls, getColumns } from './columns'

export default function List() {
  const { data: session } = useSession()
  const {
    data: queries,
    isLoading,
    mutate: refetchQueries,
  } = useVendorSupportQueries(session?.user?.id)

  const columns = getColumns()

  const listControls = {
    ...controls,
    searchableColumnHeaders: [
      { id: 'firstMessageContent', label: 'Query' },
      { id: 'queryType', label: 'Query Type' },
    ],
  }

  return (
    <DataTable
      columns={columns}
      controls={listControls}
      data={queries}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchQueries}
    />
  )
}
