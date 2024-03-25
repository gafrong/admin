import { PageTitle } from '@/components/typography/PageTitle'
import { TableClientOrders } from './table-client-orders'

export default async function ClientOrdersPage({ params }) {
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Client Order</PageTitle>
      <TableClientOrders productId={params.productId} clientId={params.id} />
    </div>
  )
}
