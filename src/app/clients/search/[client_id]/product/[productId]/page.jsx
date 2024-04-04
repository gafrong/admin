import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { TableClientOrders } from './table-client-orders'

export default async function ClientOrdersPage({ params }) {
  return (
    <PageContainer>
      <PageTitle>Client Order</PageTitle>
      <TableClientOrders
        productId={params.productId}
        clientId={params.client_id}
      />
    </PageContainer>
  )
}
