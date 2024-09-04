import Link from 'next/link'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { cn, ifDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ProfileMini } from '../users/page'

// Components
export const CellUser = ({ row }) => {
  const user = row?.original?.user || {}
  return <ProfileMini user={user} />
}

const BooleanDot = ({ isTrue }) => (
  <div
    className={`flex h-5 w-5 items-center justify-center rounded-full border border-gray-400`}
  >
    <div className={cn(`h-3 w-3 rounded-full`, isTrue && 'bg-black')}></div>
  </div>
)

const HeaderIsPending = ({ column }) => (
  <ButtonSortable column={column}>Pending</ButtonSortable>
)

const HeaderUserId = ({ column }) => (
  <ButtonSortable column={column}>User Id</ButtonSortable>
)

// Filters
export function filterByBankAccountName(rows, id, filterValue) {
  return rows.filter((row) => {
    const accountName = row.values[id]
    return accountName !== undefined
      ? accountName.toLowerCase().includes(filterValue.toLowerCase())
      : true
  })
}

export const getColumns = (handleDeleteVendor) => [
  {
    header: 'User',
    accessorKey: 'user',
    id: 'user',
    cell: CellUser,
  },
  {
    accessorKey: '_id',
    header: 'Vendor id',
    id: 'id',
    cell: ({ row }) => {
      if (!row.original._id)
        return <div className="text-red-900">Invalid vendor id</div>
      return (
        <Link
          className="text-blue-500 underline"
          href={`/superuser/vendor/${row.original.userId}`}
        >
          {row.original._id}
        </Link>
      )
    },
  },
  {
    accessorKey: 'userId',
    id: 'userId',
    header: HeaderUserId,
    cell: ({ row }) => {
      if (!row.original.userId)
        return <div className="text-red-900">Invalid user id</div>
      return (
        <Link
          className="text-blue-500 underline"
          href={`/superuser/user/${row.original.userId}`}
        >
          {row.original.userId}
        </Link>
      )
    },
  },
  {
    accessorKey: 'isPending',
    id: 'isPending',
    header: HeaderIsPending,
    cell: ({ row }) => {
      return row.original.isPending ? (
        <Link
          href={`/superuser/vendor/pending/${row.original.userId}`}
          className="text-blue-500 underline"
        >
          view pending
        </Link>
      ) : (
        <BooleanDot isTrue={row.original.isPending} />
      )
    },
  },
  {
    accessorKey: 'submitted',
    id: 'submitted',
    header: 'submitted',
    cell: ({ row }) => <BooleanDot isTrue={row.original.submitted} />,
  },
  {
    accessorKey: 'confirmed',
    id: 'confirmed',
    header: 'confirmed',
    cell: ({ row }) => <BooleanDot isTrue={row.original.confirmed} />,
  },
  {
    accessorKey: 'bank.accountName',
    id: 'Bank account name',
    header: 'Bank Account Name',
    cell: ({ row }) => row.original.bank?.accountName,
    filter: filterByBankAccountName,
  },
  {
    id: 'View Business Details',
    header: 'View Business Details',
    cell: ({ row }) => {
      return (
        <Link
          href={`/superuser/vendor/pending/${row.original.userId}`}
          className="text-blue-500 underline"
        >
          view
        </Link>
      )
    },
    filter: filterByBankAccountName,
  },
  {
    accessorKey: 'bank.accountNumber',
    id: 'Bank account number',
    header: 'Bank Account Number',
    cell: ({ row }) => row.original.bank?.accountNumber,
  },
  {
    accessorKey: 'bank.bankName',
    id: 'Bank name',
    header: 'Bank Name',
    cell: ({ row }) => row.original.bank?.bankName,
  },
  {
    accessorKey: 'bank.uploadedAt',
    id: 'bank upload date',
    header: 'Bank details Uploaded',
    cell: ({ row }) => ifDate(row.original.bank?.uploadedAt),
  },
  {
    id: 'bank details approval Date',
    header: 'Bank Details Approved',
    accessor: ({ bank }) => {
      if (!(bank && bank.approvedAt)) return ''
      return ifDate(bank.approvedAt)
    },
  },
  {
    id: 'delete',
    header: 'Delete',
    cell: ({ row }) => (
      <Button
        onClick={() => handleDeleteVendor(row.original.userId)}
        variant="destructive"
        size="sm"
      >
        Delete
      </Button>
    ),
  },
]

export const searchableColumnHeaders = [
  { id: 'userId', label: 'User ID' },
  { id: '_id', label: 'Vendor ID' },
  { id: 'bank.accountName', label: 'Bank Account Name' },
  { id: 'firstMessageContent', label: 'Query' },
]

export const controls = {
  isSearchAlwaysShown: true,
  searchableColumnHeaders,
  columnVisibilityToggles: true,
  columnBooleanFilterToggle: [
    { id: 'isPending', label: 'Pending' },
    { id: 'submitted', label: 'Submitted' },
    { id: 'confirmed', label: 'Confirmed' },
  ],
}
