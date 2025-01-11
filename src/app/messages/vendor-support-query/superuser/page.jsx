import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import React from 'react'
import SuperuserList from './superuser-list'

export default function SuperuserPage() {
  return (
    <PageContainer>
      <PageTitle>Vendor Support Queries - superadmin</PageTitle>
      <SuperuserList />
    </PageContainer>
  )
}
