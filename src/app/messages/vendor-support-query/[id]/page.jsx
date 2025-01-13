'use client'

import { Chat } from '@/components/chat/chat'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useVendorSupportQuery } from '../api'

export default function VendorSupportQueryDetails() {
  const params = useParams()
  const queryId = params.id

  const { data: session, status } = useSession()

  const {
    data: query,
    error: queryError,
    isLoading,
    mutate: refetchQuery,
  } = useVendorSupportQuery(queryId)

  if (queryError) {
    return <div>Query Error: {queryError.message}</div>
  }

  if (isLoading || !query) {
    return <div>Loading...</div>
  }

  return (
    <Chat initialQuery={query} refetchQuery={refetchQuery} session={session} />
  )
}
