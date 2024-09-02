'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NewVendorSupportQuery from '../new'

export default function NewVendorSupportQueryPage() {
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
      <h1 className="text-2xl font-bold mb-4">New Vendor Support Query</h1>
      <NewVendorSupportQuery />
    </div>
  )
}
