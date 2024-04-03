'use client'

import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import { TableClientDetails } from './table-client-details'
import { TableOrderItems } from './table-order-items'

export default function Page({ params }) {
  const { clients } = useUserStore()

  // Find the client with the id from params
  const client = clients && clients?.find((client) => client.id === params.id)

  return (
    <PageContainer>
      <PageTitle>Customer Information</PageTitle>
      {client && <TableClientDetails client={client} />}

      <PageTitle>Order History</PageTitle>
      <TableOrderItems clientId={client?.id} />
    </PageContainer>
  )
}
