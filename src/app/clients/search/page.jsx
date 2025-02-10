'use client'

import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { TableClients } from './table-clients'

function Page() {
  return (
    <PageContainer>
      <PageTitle>Search Customer</PageTitle>
      <TableClients />
    </PageContainer>
  )
}

export default Page
