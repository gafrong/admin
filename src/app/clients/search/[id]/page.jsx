'use client'

import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import { customerColumn } from './columns-client-details'
import { TableOrderItems } from './table-order-items'

export default function Page({ params }) {
  const { clients } = useUserStore()

  // Find the client with the id from params
  const client = clients && clients?.find((client) => client.id === params.id)

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Customer Information</PageTitle>
      {client && (
        <DataTable
          className="mb-8"
          columns={customerColumn}
          controls={{
            isDateAndSearchBarHidden: true,
            isPaginationHidden: true,
          }}
          data={[client]}
          defaultCellStyle="align-top"
        />
      )}
      <PageTitle>Order History</PageTitle>
      <TableOrderItems clientId={client?.id} />
    </div>
  )
}
