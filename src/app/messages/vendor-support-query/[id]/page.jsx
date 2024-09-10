'use client'

import { Chat } from '@/components/chat/chat'
import { useVendorSupportQuery } from '@/lib/api'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

export default function VendorSupportQueryDetails() {
  const { data: session } = useSession()
  const params = useParams()
  const queryId = params.id
  const {
    data: query,
    error: queryError,
    isLoading: queryLoading,
    mutate: refetchQuery,
  } = useVendorSupportQuery(params.id)

  if (queryLoading) {
    return <div>Loading...</div>
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>
  }
  return (
    <Chat initialQuery={query} queryId={queryId} refetchQuery={refetchQuery} />
  )
}
