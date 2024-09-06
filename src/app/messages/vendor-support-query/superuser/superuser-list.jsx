'use client'

import { DataTable } from '@/components/data-table/data-table'
import { useVendorSupportQueries } from '@/lib/api'
import { useSession } from 'next-auth/react'
import React from 'react'
import { controls, getColumns } from '../_components/columns'

const queryTypes = [
  { value: '', label: 'All' },
  { value: 'Product', label: 'Product' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Settlement', label: 'Settlement' },
  { value: 'Order', label: 'Order' },
  { value: 'Video', label: 'Video' },
]

export default function SuperuserList() {
  const { data: session } = useSession()
  const isSuperAdmin = session?.user?.role === 'superAdmin'

  const {
    data: queries,
    isLoading,
    mutate: refetchQueries,
  } = useVendorSupportQueries(isSuperAdmin)

  const columns = getColumns()

  const superuserControls = {
    ...controls,
    filterByCategory: {
      categories: queryTypes,
      categoryHeader: 'queryType',
      isIconHidden: true,
    },
    searchableColumnHeaders: [
      { id: 'firstMessageContent', label: 'Query' },
      { id: 'user', label: 'User' },
      { id: 'queryType', label: 'Query Type' },
    ],
  }

  return (
    <DataTable
      columns={columns}
      controls={superuserControls}
      data={queries}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchQueries}
    />
  )
}
