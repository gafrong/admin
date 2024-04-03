'use client'

import { protectRoute } from '@/app/(auth)/_components/protect-route'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { TableManageOrders } from './table-manage-orders'

function ManageOrdersPage() {
  return (
    <PageContainer>
      <PageTitle>Manage Orders</PageTitle>
      <TableManageOrders />
    </PageContainer>
  )
}

export default protectRoute(ManageOrdersPage, 'orders/manage')
