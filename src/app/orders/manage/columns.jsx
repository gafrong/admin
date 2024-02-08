'use client'

import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'

// Table filters
// -----------------------------------------------------------------------------

export const searchableColumnHeaders = [
  { id: 'name', label: 'Name' },
  { id: 'orderNumber', label: 'Order Number' },
]

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

// Table components
// -----------------------------------------------------------------------------

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
  <ButtonSortable column={column}>User</ButtonSortable>
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
  <ButtonSortable column={column}>Qty</ButtonSortable>
)

// Image
const CellProductImage = ({ row }) => (
  <div className="relative h-12 w-12 overflow-hidden rounded-sm border">
    <Image
      src={row.getValue('productImage')}
      style={{ objectFit: 'cover' }}
      fill
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
    <ButtonSortable className="ml-auto" column={column}>
      Payment
    </ButtonSortable>
  </div>
)

// Price
const HeaderPrice = ({ column }) => (
  <div className="flex">
    <ButtonSortable className="ml-auto" column={column}>
      Price
    </ButtonSortable>
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
    accessorKey: 'memo',
    header: 'Memo',
  },
]
