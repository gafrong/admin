'use client'

import { DataTable } from '@/components/data-table/data-table'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { getColumns, searchableColumnHeaders } from './columns'
import { useFetchProductQueries } from './useFetchProductQueries'

export function TableProductQuery() {
  const [selectedUserQuestion, setSelectedUserQuestion] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isQuestionReplyView = searchParams.get('question') !== null
  const dateRangePicker = 'dateCreated'
  const { questions, isLoading } = useFetchProductQueries()

  const handleEdit = ({ row }) => {
    setSelectedUserQuestion(row.original)
    router.push(`?question=${row.original._id}`)
  }

  const columns = getColumns(handleEdit)

  return (
    <DataTable
      columns={columns}
      className={isQuestionReplyView && 'hidden'}
      controls={{
        dateRangePicker,
        searchableColumnHeaders,
      }}
      data={questions}
      isLoading={isLoading}
    />
  )
}
