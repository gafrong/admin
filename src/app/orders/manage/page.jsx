'use client'

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

export default ManageOrdersPage
