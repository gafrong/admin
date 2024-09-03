'use client'

import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
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
    <PageContainer>
      <PageTitle>New Vendor Support Query</PageTitle>
      <NewVendorSupportQuery />
    </PageContainer>
  )
}
