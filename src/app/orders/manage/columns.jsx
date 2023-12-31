'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

// Table components
// ----------------

// Filters
// -------
const filterProductGroup = (row, id, value) => {
  const productGroup = row.getValue(id)
  return (
    productGroup.productAdjective1
      ?.toLowerCase()
      .includes(value?.toLowerCase()) ||
    productGroup.productAdjective2
      ?.toLowerCase()
      .includes(value?.toLowerCase()) ||
    productGroup.productAdjective3
      ?.toLowerCase()
      .includes(value?.toLowerCase()) ||
    productGroup.productDescription
      ?.toLowerCase()
      .includes(value?.toLowerCase())
  )
}

// "name": "대호 엄","orderNumber": 1873917702819,
const filterOrderNumber = (row, id, value) => {
  return row.getValue(id).toString().includes(value)
}

// "name": "대호 엄","orderNumber": 1873917702819,
const filterName = (row, id, value) => {
  return row.getValue(id).includes(value)
}

// General sorting button, add to any column to make it sortable
const ButtonSorting = ({ column, children, className }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={cn('px-0', className)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

// Date
const CellDate = ({ row }) => (
  <div className="flex flex-col space-y-2">
    <div className="whitespace-nowrap">{row.getValue('dateGroup').date}</div>
    <div className="whitespace-nowrap">{row.getValue('dateGroup').time}</div>
  </div>
)

// Product Description
const CellProductDescription = ({ row }) => {
  const {
    productAdjective1,
    productAdjective2,
    productAdjective3,
    productDescription,
  } = row.getValue('productGroup')
  return (
    <div className="flex max-w-sm flex-col space-y-2">
      <div>{productDescription}</div>
      <div>color: {productAdjective1}</div>
      <div>{productAdjective2}</div>
      <div>{productAdjective3}</div>
    </div>
  )
}

// select all rows in table
const HeaderSelectAll = ({ table }) => (
  <Checkbox
    checked={
      table.getIsAllPageRowsSelected() ||
      (table.getIsSomePageRowsSelected() && 'indeterminate')
    }
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    aria-label="Select all"
  />
)

// Select
const CellSelectCheckbox = ({ row }) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    aria-label="Select row"
  />
)

// Status
const CellStatus = ({ row }) => (
  <div className="capitalize">{row.getValue('status')}</div>
)

// Name
const HeaderName = ({ column }) => (
  <ButtonSorting column={column}>User</ButtonSorting>
)

const CellName = ({ row }) => (
  <div className="flex-col space-y-2">
    <div className="lowercase">{row.getValue('name')}</div>
    <div className="lowercase">johnnyname</div>
    <div className="lowercase">(5)</div>
  </div>
)

// Quantity
const HeaderQuantity = ({ column }) => (
  <ButtonSorting column={column}>Qty</ButtonSorting>
)

// Image
const CellProductImage = ({ row }) => (
  <div className="flex w-24 overflow-hidden">
    <Image
      src={row.getValue('productImage')}
      width={160}
      height={160}
      // layout="fixed"
      alt="product image"
    />
  </div>
)

// Amount
const CellAmount = ({ row }) => {
  const amount = parseFloat(row.getValue('amount'))
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)

  return <div className="text-right font-medium">{formatted}</div>
}

const HeaderAmount = ({ column }) => (
  <div className="flex">
    <ButtonSorting className="ml-auto" column={column}>
      Payment
    </ButtonSorting>
  </div>
)

// Price
const HeaderPrice = ({ column }) => (
  <div className="flex">
    <ButtonSorting className="ml-auto" column={column}>
      Price
    </ButtonSorting>
  </div>
)

const CellPrice = ({ row }) => {
  const amount = parseFloat(row.getValue('price'))
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
  return <div className="text-right font-medium">{formatted}</div>
}

// Actions
const CellActions = ({ row }) => {
  const payment = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment.id)}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Table configuration
// -------------------

export const columns = [
  {
    cell: CellSelectCheckbox,
    enableHiding: false,
    enableSorting: false,
    header: HeaderSelectAll,
    id: 'select',
  },
  {
    accessorKey: 'status',
    cell: CellStatus,
    // filterFn: (row, id, value) =>
    //   row.getValue(id)?.toLowerCase().includes(value.toLowerCase()),
    header: 'Status',
  },
  {
    accessorKey: 'dateGroup',
    cell: CellDate,
    header: 'Date',
    visibilityLabel: 'Date',
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order #',
    visibilityLabel: 'Order Number',
    filterFn: filterOrderNumber,
  },
  {
    accessorKey: 'name',
    cell: CellName,
    header: HeaderName,
    filterFn: filterName,
  },
  {
    accessorKey: 'productImage',
    cell: CellProductImage,
    header: '',
    visibilityLabel: 'Product Image',
  },
  {
    accessorKey: 'productGroup',
    cell: CellProductDescription,
    header: 'Product',
    visibilityLabel: 'Product Details',
    filterFn: filterProductGroup,
  },
  {
    accessorKey: 'quantity',
    header: HeaderQuantity,
  },
  {
    accessorKey: 'price',
    cell: CellPrice,
    header: HeaderPrice,
  },
  {
    accessorKey: 'amount',
    cell: CellAmount,
    header: HeaderAmount,
  },
  {
    accessorKey: 'method',
    header: 'Method',
  },
  {
    accessorKey: 'memo',
    header: 'Memo',
  },
  {
    cell: CellActions,
    enableHiding: false,
    id: 'actions',
  },
]
