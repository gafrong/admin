'use client'

import { useFetchClients } from '@/app/fetch/use-fetch-clients'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { TableClientDetails } from './table-client-details'
import { TableOrderItems } from './table-order-items'

export default function Page({ params }) {
  const { clients, isLoading } = useFetchClients()

  // Find the client with the id from params
  const client =
    clients && clients?.find((client) => client.id === params.client_id)

  return (
    <PageContainer>
      <PageTitle>Customer Information</PageTitle>
      {client && <TableClientDetails client={client} />}

      <PageTitle>Order History</PageTitle>
      <TableOrderItems clientId={client?.id} />
    </PageContainer>
  )
}
