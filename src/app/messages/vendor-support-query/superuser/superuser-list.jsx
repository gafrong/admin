'use client'

import { DataTable } from '@/components/data-table/data-table'
import { useVendorSupportQueries } from '@/lib/api'
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

// Custom filter functions
const filterFirstMessageContent = (row, id, value) => {
  console.log('filterFirstMessageContent')

  return row.original.messages[0].content
    .toLowerCase()
    .includes(value.toLowerCase())
}

const filterUser = (row, id, value) => {
  const participants = row.original.participants
  if (participants && participants.length > 0) {
    const user = participants[0]
    return (
      (user?.name && user.name.toLowerCase().includes(value.toLowerCase())) ||
      (user?.email && user.email.toLowerCase().includes(value.toLowerCase()))
    )
  }
  return false
}

const filterQueryType = (row, id, value) => {
  console.log('filterQueryType')

  return row.original.queryType.toLowerCase().includes(value.toLowerCase())
}

export default function SuperuserList() {
  const {
    data: queries,
    isLoading,
    mutate: refetchQueries,
  } = useVendorSupportQueries()

  const columns = getColumns()

  // Add custom filter functions to columns
  const columnsWithFilters = columns.map((column) => {
    switch (column.accessorKey) {
      case 'firstMessageContent':
        return { ...column, filterFn: filterFirstMessageContent }
      case 'participants':
        return { ...column, filterFn: filterUser }
      case 'queryType':
        return { ...column, filterFn: filterQueryType }
      default:
        return column
    }
  })

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
      columns={columnsWithFilters}
      controls={superuserControls}
      data={queries}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchQueries}
    />
  )
}
