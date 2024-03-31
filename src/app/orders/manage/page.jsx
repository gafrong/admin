'use client'

import { protectRoute } from '@/app/auth-components/protect-route'
import { PageTitle } from '@/components/typography/PageTitle'
import { TableManageOrders } from './table-manage-orders'

function ManageOrdersPage() {
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Manage Orders</PageTitle>
      <TableManageOrders />
    </div>
  )
}

export default protectRoute(ManageOrdersPage)
