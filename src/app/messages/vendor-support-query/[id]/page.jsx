'use client'

import { Chat } from '@/components/chat/chat'
import { useParams } from 'next/navigation'
import { useVendorSupportQuery } from '../api'

export default function VendorSupportQueryDetails() {
  const params = useParams()
  const queryId = params.id
  const {
    data: query,
    error: queryError,
    isLoading,
    mutate: refetchQuery,
  } = useVendorSupportQuery(params.id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (queryError) {
    return <div>Query Error: {queryError.message}</div>
  }

  return (
    <Chat initialQuery={query} queryId={queryId} refetchQuery={refetchQuery} />
  )
}
