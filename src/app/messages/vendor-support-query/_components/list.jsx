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
  console.log({ queries })
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
