'use client'

import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import { TableClientDetails } from './table-client-details'
import { TableOrderItems } from './table-order-items'

export default function Page({ params }) {
  const { clients } = useUserStore()

  // Find the client with the id from params
  const client = clients && clients?.find((client) => client.id === params.id)

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Customer Information</PageTitle>
      {client && <TableClientDetails client={client} />}

      <PageTitle>Order History</PageTitle>
      <TableOrderItems clientId={client?.id} />
    </div>
  )
}
