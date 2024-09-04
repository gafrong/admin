'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import awsURL from '@/assets/common/awsUrl'
import { DataTable } from '@/components/data-table/data-table'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { ImageProfile } from '@/components/image-profile'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const srcDefaultProfileImage =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png'

export const CellUser = ({ row }) => {
  const { image, name, username } = row?.original || {}
  const user = { image, name, username }
  return <ProfileMini user={user} />
}
const HeaderUserId = ({ column }) => (
  <ButtonSortable column={column}>User id</ButtonSortable>
)
const HeaderName = ({ column }) => (
  <ButtonSortable column={column}>Name</ButtonSortable>
)
const HeaderUsername = ({ column }) => (
  <ButtonSortable column={column}>username</ButtonSortable>
)
const HeaderBrandDescription = ({ column }) => (
  <ButtonSortable column={column}>Brand description</ButtonSortable>
)
const HeaderBrand = ({ column }) => (
  <ButtonSortable column={column}>Brand</ButtonSortable>
)
const HeaderRole = ({ column }) => (
  <ButtonSortable column={column}>Role</ButtonSortable>
)
const HeaderIsAdmin = ({ column }) => (
  <ButtonSortable column={column}>Admin</ButtonSortable>
)
const HeaderIsVerified = ({ column }) => (
  <ButtonSortable column={column}>Verified</ButtonSortable>
)
const HeaderIsSubmitted = ({ column }) => (
  <ButtonSortable column={column}>Submitted</ButtonSortable>
)

export const ProfileMini = ({ user }) => {
  if (!user) return null
  const isImage = user.image && user.image.trim() !== ''
  const imageUrl = isImage ? `${awsURL}${user.image}` : srcDefaultProfileImage

  return (
    <div className="flex gap-4">
      <ImageProfile size={48} src={imageUrl} />
      <div className="mr-4">
        <p>{user.name}</p>
        <p className="mt-1 text-xs text-gray-500">@{user.username}</p>
      </div>
    </div>
  )
}

const UserList = () => {
  const {
    data: users,
    error,
    isLoading,
    mutate: refetchUsers,
    vendorId: userId,
  } = useFetchAuth('users')

  const BooleanDot = (isTruthy) => (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full border border-gray-400`}
    >
      <div className={cn(`h-3 w-3 rounded-full`, isTruthy && 'bg-black')}></div>
    </div>
  )

  const columns = [
    {
      header: 'User', // Define a header for the column
      accessorKey: 'user', // This is a placeholder; it's not used but helps identify the column
      cell: CellUser, // Use the CellUser component to render the cell
    },
    {
      header: HeaderUserId,
      accessorKey: 'details',
      cell: ({ row }) => (
        <Link
          className="text-blue-500 underline"
          href={`/superuser/user/${row.original._id}`}
        >
          {row.original._id}
        </Link>
      ),
    },
    {
      accessorKey: 'name',
      header: HeaderName,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'username',
      header: HeaderUsername,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'birthday',
      header: 'Birthday',
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.birthday}</div>
      ),
    },
    {
      accessorKey: 'brand',
      header: HeaderBrand,
    },
    {
      accessorKey: 'brandDescription',
      header: HeaderBrandDescription,
      id: 'Brand Description',
    },
    {
      accessorKey: 'role',
      header: HeaderRole,
    },
    {
      accessorKey: 'isAdmin',
      header: HeaderIsAdmin,
      cell: ({ row }) => BooleanDot(row.original.isAdmin),
    },
    {
      accessorKey: 'verified',
      header: HeaderIsVerified,
      cell: ({ row }) => BooleanDot(row.original.verified),
    },
    {
      accessorKey: 'submitted',
      header: HeaderIsSubmitted,
      cell: ({ row }) => BooleanDot(row.original.submitted),
    },
  ]

  const controls = {
    isSearchAlwaysShown: true,
    searchableColumnHeaders: [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'username', label: 'Username' },
    ],
    columnBooleanFilterToggle: [
      { id: 'isAdmin', label: 'Admin' },
      { id: 'submitted', label: 'Submitted' },
      { id: 'verified', label: 'Verified' },
    ],
    columnVisibilityToggles: true,
  }

  return (
    <>
      {/* <pre>{JSON.stringify(users?.[0], null, 2)}</pre> */}
      <DataTable
        columns={columns}
        controls={controls}
        data={users}
        defaultCellStyle="align-top"
        isLoading={isLoading}
        refetchTableData={refetchUsers}
      />
    </>
  )
}

export default function UsersPage() {
  return (
    <PageContainer>
      <PageTitle>Users</PageTitle>
      <UserList />
    </PageContainer>
  )
}
