'use client'

import { useFetchClients } from '@/app/fetch/use-fetch-clients'
import { DataTable } from '@/components/data-table/data-table'
import React from 'react'
import { columns, searchableColumnHeaders } from './columns'

export function TableClients() {
  const { clients, isLoading, refetchClients } = useFetchClients()

  const controls = {
    isSearchAlwaysShown: true,
    searchableColumnHeaders,
  }

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={clients}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchClients}
    />
  )
}
