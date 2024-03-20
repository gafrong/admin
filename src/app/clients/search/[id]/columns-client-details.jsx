export const customerColumn = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    id: 'address',
    cell: ({ row }) => row.original.adresses?.[0],
    header: 'Address',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]
