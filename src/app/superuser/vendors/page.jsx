'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { cn, ifDate } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { ProfileMini } from '../users/page'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import baseURL from '@/assets/common/baseUrl'
import { useSession } from 'next-auth/react'
import { LoadingSpinnerButton } from '@/components/LoadingSpinner'

// Filters
function filterByBankAccountName(rows, id, filterValue) {
  return rows.filter((row) => {
    // Access the nested value
    const accountName = row.values[id]
    // Perform the filtering, case insensitive
    return accountName !== undefined ?
        accountName.toLowerCase().includes(filterValue.toLowerCase())
      : true
  })
}

// Components
const CellUser = ({ row }) => {
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

export const getColumns = (handleDeleteVendor) => [
  // CellUser
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
  { id: 'userId', label: 'user id' },
  { id: 'id', label: 'vendor id' },
  { id: 'Bank account name', label: 'bank account' },
  // { id: 'isPending', label: 'pending' },
]

const controls = {
  isSearchAlwaysShown: true,
  searchableColumnHeaders,
  columnVisibilityToggles: true,
  columnBooleanFilterToggle: [
    { id: 'isPending', label: 'Pending' },
    { id: 'submitted', label: 'Submitted' },
    { id: 'confirmed', label: 'Confirmed' },
  ],
}

export function VendorList() {
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const { token } = session || {}

  const {
    data: vendors,
    error,
    isLoading,
    mutate: refetchVendors,
  } = useFetchAuth('vendor/all')
  console.log('<VendorList>', vendors)

  const handleDeleteVendor = async (userId) => {
    const URL_ENDPOINT = `${baseURL}vendor/${userId}`
    const headers = { Authorization: `Bearer ${token}` }
    
    try {
      const response = await axios.delete(URL_ENDPOINT, { headers })
      if (response.status === 200) {
        toast({
          title: "Vendor deleted",
          description: "The vendor has been successfully deleted.",
        })
        refetchVendors()
      }
    } catch (error) {
      console.error('Error deleting vendor:', error)
      if (error.response && error.response.status === 404) {
        toast({
          title: "Error",
          description: "Vendor not found. It may have already been deleted.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: `Failed to delete the vendor: ${error.message}`,
          variant: "destructive",
        })
      }
    }
  }



  const columns = getColumns(handleDeleteVendor)

  return (
    <>
      <DataTable
        columns={columns}
        controls={controls}
        data={vendors}
        defaultCellStyle="align-top"
        isLoading={isLoading}
        refetchTableData={refetchVendors}
      />
    </>
  )
}

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>Vendors</PageTitle>
      <VendorList />
    </PageContainer>
  )
}

/*
/// Shape of the vendor data

const sampleVendor = {
  bank: {
    bankName: 'asdfa',
    accountNumber: '234324',
    accountName: 'dfadsfas',
    uploadedAt: '2024-06-09T11:28:57.376Z',
  },
  document: {
    s3Key: 'profiles/502b6653-df7f-4c72-a179-10386205b93c',
    uploadedAt: '2024-06-04T10:20:10.811Z',
  },
  contacts: { customerService: { sameAsStoreManager: false } },
  pending: {
    document: { s3Key: '', uploadedAt: '2024-06-09T11:28:57.376Z' },
    bank: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      uploadedAt: '2024-06-09T11:28:57.376Z',
    },
  },
  clients: [],
  _id: '6566c8745702c9fc65697cc8',
  profileImg: 'profiles/c7107dd5-879e-48ec-ae65-5e82f654d992',
  brandName: 'asdfadfa',
  username: 'dsfadfadfasfd',
  email: 'asdfadf',
  phone: '23423423',
  bankName: 'asdfa',
  bankAccount: 234324,
  bankOwner: 'dfadsfas',
  userId: '6566c8295702c9fc65697cc2',
  submitted: true,
  confirmed: false,
  __v: 0,
  documentHistory: [],
  updatedAt: '2024-06-07T02:00:54.185Z',
  bankHistory: [],
  id: '6566c8745702c9fc65697cc8',
  isPendingBank: false,
}

*/
