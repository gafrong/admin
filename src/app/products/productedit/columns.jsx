import awsURL from '@/assets/common/awsUrl'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'

// Table components
// -----------------------------------------------------------------------------

// Name
const HeaderName = ({ column }) => (
  <ButtonSortable column={column}>Title</ButtonSortable>
)

// Image
const CellProductImage = ({ row }) => (
  <div className="h-12 w-12 overflow-hidden rounded-sm border">
    <Image
      src={awsURL + row.getValue('image')}
      width={48}
      height={48}
      style={{ objectFit: 'contain' }}
      alt="product image"
    />
  </div>
)

// Price
const HeaderPrice = ({ column }) => (
  <ButtonSortable column={column}>Price</ButtonSortable>
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
        Edit
      </span>
    </Link>
  </Button>
)

// Table configuration
// -------------------

export const columns = [
  {
    accessorKey: 'image',
    cell: CellProductImage,
    header: 'Product',
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
    header: 'Edit',
  },
]
