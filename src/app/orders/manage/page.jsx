import { PageTitle } from '@/components/typography/PageTitle'
import { TableManageOrders } from './table-manage-orders'

export default async function ManageOrdersPage() {
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Manage Orders</PageTitle>
      <TableManageOrders />
    </div>
  )
}
