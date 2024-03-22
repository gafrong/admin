import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import {
  filterDateBetween,
  formatDate,
} from '@/components/data-table/data-table-date-range-picker'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Table filters
// -----------------------------------------------------------------------------

// Table components
// -----------------------------------------------------------------------------

// Image
const CellUser = ({ row }) => {
  const user = row.original.userId // Access the original row data
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 overflow-hidden rounded-full border">
        <Image
          src={awsURL + user.image} // Access nested object value
          width={48}
          height={48}
          style={{ objectFit: 'contain' }}
          alt="product image"
        />
      </div>
      <div className="mr-4">
        <p className="">{user.name}</p>
        <p className="mt-1 text-xs">@{user.username}</p>
      </div>
    </div>
  )
}

// Image
const CellProductImage = ({ row }) => {
  const productImage = row.original?.productId?.image
  const img = productImage ? awsURL + productImage : IMG.empty_product
  return (
    <div className="h-12 w-12 overflow-hidden border">
      <Image alt="product image" height={48} src={img} width={48} />
    </div>
  )
}

// Date created
const HeaderDateCreated = ({ column }) => (
  <ButtonSortable column={column}>날짜</ButtonSortable>
)

const CellDateCreated = ({ row }) => formatDate(row.getValue('dateCreated'))

const HeaderTitle = ({ column }) => (
  <ButtonSortable column={column}>Title</ButtonSortable>
)

const CellEdit = ({ row }) => (
  <Button variant="outline" asChild>
    <Link className="w-20" href={`/messages/productquery/${row.original._id}`}>
      <span className="inline-flex flex-row gap-1">편집</span>
    </Link>
  </Button>
)

export const columns = [
  {
    cell: CellProductImage,
    header: 'Product',
  },
  {
    accessorKey: 'title',
    header: HeaderTitle,
  },
  {
    accessorKey: 'detail',
    header: 'Detail',
  },
  {
    cell: CellUser,
    header: 'User',
  },
  {
    accessorKey: 'dateCreated',
    cell: CellDateCreated,
    filterFn: filterDateBetween,
    header: HeaderDateCreated,
  },
  {
    cell: CellEdit,
    header: 'Edit Page',
  },
]
