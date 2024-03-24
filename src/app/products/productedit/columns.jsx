import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { DataTableProductImage } from '@/components/data-table/data-table-cell-components'
import {
  filterDateBetween,
  formatDate,
} from '@/components/data-table/data-table-date-range-picker'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'

// Table filters
// -----------------------------------------------------------------------------

// Table components
// -----------------------------------------------------------------------------

// Name
const HeaderName = ({ column }) => (
  <ButtonSortable column={column}>제목</ButtonSortable>
)

// Image
const CellProductImage = ({ row }) => (
  <DataTableProductImage productImage={row.getValue('image')} />
)

// Price
const HeaderPrice = ({ column }) => (
  <ButtonSortable column={column}>가격</ButtonSortable>
)

const CellPrice = ({ row }) => {
  const amount = parseFloat(row.getValue('price'))
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
  return <div className="w-20 text-right font-medium">{formatted}</div>
}
// 500,000원 ?

const CellEdit = ({ row }) => (
  <Button variant="secondary" asChild>
    <Link
      href={{
        pathname: '/products/productdetail',
        query: { product: JSON.stringify(row.original) },
      }}
      className="w-40"
    >
      <span className="inline-flex w-20 flex-row gap-1">
        <FiEdit className="mt-[2px] w-6" />
        편집
      </span>
    </Link>
  </Button>
)

const CellDelete = ({ row }) => (
  <Button variant="destructive" asChild>
    <Link
      href={{
        pathname: '/products/productdetail',
        query: { product: JSON.stringify(row.original) },
      }}
      className="w-16"
    >
      <span className="w-8">삭제</span>
    </Link>
  </Button>
)

//  dateCreated
const HeaderDateCreated = ({ column }) => (
  <ButtonSortable column={column}>날짜</ButtonSortable>
)
const CellDateCreated = ({ row }) => formatDate(row.getValue('dateCreated'))

// Table configuration
// -------------------

export const columns = [
  {
    accessorKey: 'dateCreated',
    cell: CellDateCreated,
    filterFn: filterDateBetween,
    header: HeaderDateCreated,
  },
  {
    accessorKey: 'image',
    cell: CellProductImage,
    header: '제품',
  },
  {
    accessorKey: 'name',
    header: HeaderName,
  },
  {
    accessorKey: 'price',
    cell: CellPrice,
    // filterFn: filterPrice,
    header: HeaderPrice,
  },
  {
    cell: CellEdit,
    header: '편집',
  },
  {
    cell: CellDelete,
    header: '삭제',
  },
]
