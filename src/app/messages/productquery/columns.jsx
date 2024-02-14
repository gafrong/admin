import awsURL from '@/assets/common/awsUrl'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import {
  filterDateBetween,
  formatDate,
} from '@/components/data-table/data-table-date-range-picker'
import Image from 'next/image'
import React from 'react'

// Table filters
// -----------------------------------------------------------------------------

export const searchableColumnHeaders = [
  { id: 'title', label: '날짜', placeholder: '검색 날짜...' },
  { id: 'description', label: '설명', placeholder: '검색 설명...' },
]

// Table components
// -----------------------------------------------------------------------------

// Image
const CellUser = ({ row }) => {
  const user = row.original.userId // Access the original row data
  return (
    <>
      <div className="flex gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full border">
          <Image
            src={awsURL + user.image} // Access nested object value
            width={48}
            height={48}
            style={{ objectFit: 'contain' }}
            alt="product image"
          />
        </div>
        <div className="mr-4">
          <p className="">{user.name}</p>
          <p>{user.username}</p>
        </div>
      </div>
    </>
  )
}

// Image
const CellProductImage = ({ row }) => {
  const productImage = row.original?.productId?.image
  if (!productImage) return <Image src={"https://voutiq-app.s3.ap-northeast-2.amazonaws.com/website/product.jpg"} width={48} height={48} className='border p-1' alt="product" />
  return (
    <>
      <div className="flex gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full border">
          <Image
            src={awsURL + productImage} // Access nested object value
            width={48}
            height={48}
            style={{ objectFit: 'contain' }}
            alt="product image"
          />
        </div>
      </div>
    </>
  )
}

// Date created
const HeaderDateCreated = ({ column }) => (
  <ButtonSortable column={column}>날짜</ButtonSortable>
)

const CellDateCreated = ({ row }) => formatDate(row.getValue('dateCreated'))

const HeaderTitle = ({ column }) => (
  <ButtonSortable column={column}>Title</ButtonSortable>
)

export const getColumns = () => {
  // export const getColumns = ({ removeVideo }) =>
  // const CellDeleteVideo = ({ row }) => {
  //   const video = row.original
  //   return (
  //     <Button variant="destructive" onClick={() => removeVideo(video)}>
  //       삭제
  //     </Button>
  //   )
  // }

  const columns = [
    {
      cell: CellProductImage,
      header: 'Product',
    },
    {
      accessorKey: 'title',
      header: HeaderTitle,
    },
    {
      accessorKey: 'detail',
      header: 'Detail',
    },
    {
      cell: CellUser,
      header: 'User',
    },
    {
      accessorKey: 'dateCreated',
      cell: CellDateCreated,
      filterFn: filterDateBetween,
      header: HeaderDateCreated,
    },

    // Do we need to add a delete button? it will be same logic as delete video.
    // {
    //   cell: CellDeleteVideo,
    //   header: '삭제<',
    // },
  ]
  return columns
}
