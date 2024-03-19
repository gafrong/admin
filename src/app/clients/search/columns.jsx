'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Table filters
// -----------------------------------------------------------------------------

export const searchableColumnHeaders = [
  { id: 'username', label: 'Username' },
  { id: 'name', label: 'Name' },
  { id: '_id', label: 'Id' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone #' },
]

const filterEmail = (row, id, value) => row.original.email.includes(value)
const filterPhone = (row, id, value) => row.original.phone.includes(value)
const filterId = (row, id, value) => row.original._id.includes(value)
const filterUserName = (row, id, value) => row.original.username.includes(value)
const filterName = (row, id, value) => row.original.name.includes(value)

// -----------------------------------------------------------------------------

const CellEdit = ({ row }) => (
  <Button variant="outline" asChild>
    <Link className="w-20" href={`/clients/search/${row.original._id}`}>
      <span className="inline-flex flex-row gap-1">편집</span>
    </Link>
  </Button>
)

// Table configuration
// -------------------

export const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    filterFn: filterName,
  },
  {
    accessorKey: 'username',
    header: 'Username',
    filterFn: filterUserName,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    filterFn: filterEmail,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    filterFn: filterPhone,
  },
  {
    accessorKey: '_id',
    header: 'Id',
    filterFn: filterId,
  },
  {
    cell: CellEdit,
    header: '편집',
  },
]
