import Link from 'next/link'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { cn, ifDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ProfileMini } from '../users/page'

// Table filters
// -----------------------------------------------------------------------------
export function filterByBankAccountName(rows, id, filterValue) {
  return rows.filter((row) => {
    const accountName = row.values[id]
    return accountName !== undefined
      ? accountName.toLowerCase().includes(filterValue.toLowerCase())
      : true
  })
}

// Table Components: Header
// -----------------------------------------------------------------------------
const HeaderIsPending = ({ column }) => (
  <ButtonSortable column={column}>Pending</ButtonSortable>
)

const HeaderUserId = ({ column }) => (
  <ButtonSortable column={column}>User Id</ButtonSortable>
)

// Table Components: Cell
// -----------------------------------------------------------------------------
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

const cellVendorId = ({ row }) => {
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
}

const cellUserId = ({ row }) => {
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
}

const cellIsPending = ({ row }) => {
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
}

const cellSubmitted = ({ row }) => <BooleanDot isTrue={row.original.submitted} />

const cellConfirmed = ({ row }) => <BooleanDot isTrue={row.original.confirmed} />

const cellBankAccountName = ({ row }) => row.original.bank?.accountName

const cellViewBusinessDetails = ({ row }) => (
  <Link
    href={`/superuser/vendor/pending/${row.original.userId}`}
    className="text-blue-500 underline"
  >
    view
  </Link>
)

const cellBankAccountNumber = ({ row }) => row.original.bank?.accountNumber

const cellBankName = ({ row }) => row.original.bank?.bankName

const cellBankUploadDate = ({ row }) => ifDate(row.original.bank?.uploadedAt)

const cellBankApprovalDate = ({ bank }) => {
  if (!(bank && bank.approvedAt)) return ''
  return ifDate(bank.approvedAt)
}

const cellDelete = ({ row, handleDeleteVendor }) => (
  <Button
    onClick={() => handleDeleteVendor(row.original.userId)}
    variant="destructive"
    size="sm"
  >
    Delete
  </Button>
)

// Column definitions
// -----------------------------------------------------------------------------
export const getColumns = (handleDeleteVendor) => [
  {
    accessorKey: 'user',
    cell: CellUser,
    header: 'User',
    id: 'user',
  },
  {
    accessorKey: '_id',
    cell: cellVendorId,
    header: 'Vendor id',
    id: 'id',
  },
  {
    accessorKey: 'userId',
    cell: cellUserId,
    header: HeaderUserId,
    id: 'userId',
  },
  {
    accessorKey: 'isPending',
    cell: cellIsPending,
    header: HeaderIsPending,
    id: 'isPending',
  },
  {
    accessorKey: 'submitted',
    cell: cellSubmitted,
    header: 'submitted',
    id: 'submitted',
  },
  {
    accessorKey: 'confirmed',
    cell: cellConfirmed,
    header: 'confirmed',
    id: 'confirmed',
  },
  {
    accessorKey: 'bank.accountName',
    cell: cellBankAccountName,
    filter: filterByBankAccountName,
    header: 'Bank Account Name',
    id: 'Bank account name',
  },
  {
    cell: cellViewBusinessDetails,
    filter: filterByBankAccountName,
    header: 'View Business Details',
    id: 'View Business Details',
  },
  {
    accessorKey: 'bank.accountNumber',
    cell: cellBankAccountNumber,
    header: 'Bank Account Number',
    id: 'Bank account number',
  },
  {
    accessorKey: 'bank.bankName',
    cell: cellBankName,
    header: 'Bank Name',
    id: 'Bank name',
  },
  {
    accessorKey: 'bank.uploadedAt',
    cell: cellBankUploadDate,
    header: 'Bank details Uploaded',
    id: 'bank upload date',
  },
  {
    accessor: cellBankApprovalDate,
    header: 'Bank Details Approved',
    id: 'bank details approval Date',
  },
  {
    cell: ({ row }) => cellDelete({ row, handleDeleteVendor }),
    header: 'Delete',
    id: 'delete',
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
