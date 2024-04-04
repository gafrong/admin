'use client'

import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { ProductImage } from '@/components/data-table/data-table-cell-components'
import { filterDateBetween } from '@/components/data-table/data-table-date-range-picker'
import { format } from 'date-fns'

// Table filters
// -----------------------------------------------------------------------------

// "name": "대호 엄","orderNumber": 1873917702819,
const filterOrderNumber = (row, id, value) => {
  return row.getValue(id).toString().includes(value)
}

// "name": "대호 엄","orderNumber": 1873917702819,
const filterName = (row, id, value) => {
  const name = row.original.buyer.name
  return name.includes(value)
}

function filterStatus(row, id, filterValue) {
  const status = getLastCompletedStatus(row.getValue(id))?.type
  return status === filterValue
}

// -----------------------------------------------------------------------------

// Date
function getCurrentDateTime(dateString) {
  if (!Date.parse(dateString)) {
    console.error('Invalid date string: ', dateString)
    return {
      date: dateString,
      time: dateString,
    }
  }
  const dateObject = new Date(dateString)
  return {
    date: format(dateObject, 'yyyy.MM.dd'),
    time: format(dateObject, 'HH:mm:ss'),
  }
}

const CellDate = ({ row }) => {
  const { date, time } = getCurrentDateTime(row.getValue('dateOrdered'))
  return (
    <div className="flex flex-col space-y-2">
      <div className="whitespace-nowrap">{date}</div>
      <div className="whitespace-nowrap">{time}</div>
    </div>
  )
}
const HeaderDateCreated = ({ column }) => (
  <ButtonSortable column={column}>날짜</ButtonSortable>
)

// Product Description
const CellProductDescription = ({ row }) => {
  const { selectedColor, product = {} } = row.original
  const { name, description, richDescription } = product

  return (
    <div className="flex max-w-sm flex-col space-y-2">
      <div>{name}</div>
      <div>{description}</div>
      <div>{richDescription}</div>
      <div>{selectedColor}</div>
    </div>
  )
}

// Status
const getLastCompletedStatus = (orderStatuses) =>
  orderStatuses
    .slice()
    .reverse()
    .find((status) => Boolean(status.isCompleted))

const CellStatus = ({ row }) => {
  const orderStatuses = row.getValue('orderStatus')
  const status = getLastCompletedStatus(orderStatuses)?.type
  return <div className="capitalize">{status}</div>
}

const HeaderStatus = () => <div className="w-16">Status</div>

// the accessor function is used by react-table when the required value is nested
// by the filter and sort functions
const CellStatusAccessor = ({ row }) =>
  getLastCompletedStatus(row.getValue('orderStatus'))?.type

// Name
const HeaderName = ({ column }) => (
  <ButtonSortable column={column}>User</ButtonSortable>
)

const CellName = ({ row }) => {
  const { name, username, email } = row.original.buyer || {}
  return (
    <div className="flex-col space-y-2">
      <div className="lowercase">{name}</div>
      <div className="lowercase">{username}</div>
      <div className="lowercase">{email}</div>
    </div>
  )
}

// Quantity
const HeaderQuantity = ({ column }) => (
  <ButtonSortable column={column}>Qty</ButtonSortable>
)

// Image
const CellProductImage = ({ row }) => (
  <ProductImage src={row.getValue('product')?.image} />
)

// Amount
const CellProductPrice = ({ row }) => {
  const amount = parseFloat(row.getValue('product')?.price) || 0
  // Format the amount as a dollar amount
  const formatted =
    amount === NaN ? '₩0' : (
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KRW',
      }).format(amount)
    )

  return <div className="text-right font-medium">{formatted}</div>
}

const HeaderProductPrice = ({ column }) => (
  <div className="flex">
    <ButtonSortable className="ml-auto" column={column}>
      Price
    </ButtonSortable>
  </div>
)

// Price
const HeaderProductPayment = ({ column }) => (
  <div className="flex">
    <ButtonSortable className="ml-auto" column={column}>
      Payment
    </ButtonSortable>
  </div>
)

const CellProductPayment = ({ row }) => {
  const amount = parseFloat(row.getValue('paidPrice'))
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
    accessorKey: 'orderStatus',
    accessor: CellStatusAccessor,
    cell: CellStatus,
    filterFn: filterStatus,
    header: HeaderStatus,
  },
  {
    accessorKey: 'dateOrdered',
    cell: CellDate,
    filterFn: filterDateBetween,
    header: HeaderDateCreated,
    visibilityLabel: 'Date',
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order #',
    visibilityLabel: 'Order Number',
    filterFn: filterOrderNumber,
  },
  {
    id: 'buyerName',
    cell: CellName,
    header: HeaderName,
    filterFn: filterName,
  },
  {
    accessorKey: 'product',
    cell: CellProductImage,
    header: '',
    visibilityLabel: 'Product Image',
  },
  {
    id: 'description',
    cell: CellProductDescription,
    header: 'Product',
    visibilityLabel: 'Product Details',
  },
  {
    accessorKey: 'quantity',
    header: HeaderQuantity,
  },
  {
    accessorKey: 'price',
    cell: CellProductPrice,
    header: HeaderProductPrice,
  },
  {
    accessorKey: 'paidPrice',
    cell: CellProductPayment,
    header: HeaderProductPayment,
  },
]
