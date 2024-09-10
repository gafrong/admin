import { ProfileMini } from '@/app/superuser/users/page'
import awsURL from '@/assets/common/awsUrl'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { ProductImage } from '@/components/data-table/data-table-cell-components'
import {
  filterDateBetween,
  formatDate,
} from '@/components/data-table/data-table-date-range-picker'
import { ImageProfile } from '@/components/image-profile'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

// Table filters
// -----------------------------------------------------------------------------

// Table components
// -----------------------------------------------------------------------------

// User
export const CellUser = ({ row }) => {
  const user = row.original.userId || {}
  return <ProfileMini user={user} />
}

// Image
const CellProductImage = ({ row }) => (
  <ProductImage src={row.original?.productId?.image} />
)

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
