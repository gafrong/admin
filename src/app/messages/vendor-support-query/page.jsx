'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function VendorSupportQueryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session || !session.user.isSuperAdmin) {
      router.push('/') // Redirect to home if not a superadmin
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || !session.user.isSuperAdmin) {
    return null // This will prevent any flash of content before redirect
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Support Query</h1>
      <p>This page will contain the vendor-to-superAdmin support query functionality.</p>
    </div>
  )
}
