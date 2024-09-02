'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NewVendorSupportQuery from './new'
import ListVendorSupportQueries from './list'

export default function VendorSupportQueryPage({ params }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session) {
      router.push('/') // Redirect to home if not logged in
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null // This will prevent any flash of content before redirect
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Support Query</h1>
      {params.action === 'new' ? (
        <NewVendorSupportQuery />
      ) : params.action === 'list' ? (
        <ListVendorSupportQueries />
      ) : (
        <p>Invalid action. Please use /new or /list.</p>
      )}
    </div>
  )
}
