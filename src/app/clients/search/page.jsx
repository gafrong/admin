'use client'

import { protectRoute } from '@/app/auth-components/protect-route'
import { PageTitle } from '@/components/typography/PageTitle'
import { TableClients } from './table-clients'

function Page() {
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Search Customer</PageTitle>
      <TableClients />
    </div>
  )
}

export default protectRoute(Page)
