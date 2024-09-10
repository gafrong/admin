'use client'

import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ListVendorSupportQueries from './_components/list'

export default function ListVendorSupportQueryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/') // Redirect to home if not logged in
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null // This will prevent any flash of content before redirect
  }

  return (
    <PageContainer>
      <PageTitle>Vendor Support Queries</PageTitle>
      <ListVendorSupportQueries />
    </PageContainer>
  )
}
