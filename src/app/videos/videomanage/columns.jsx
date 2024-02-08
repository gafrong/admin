import awsURL from '@/assets/common/awsUrl'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import {
  filterDateBetween,
  formatDate,
} from '@/components/data-table/data-table-date-range-picker'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

// Table filters
// -----------------------------------------------------------------------------

export const searchableColumnHeaders = [
  { id: 'description', label: '설명', placeholder: '검색 설명...' },
]

// Table components
// -----------------------------------------------------------------------------

// Image
const CellProductImage = ({ row }) => (
  <div className="h-18 w-12 overflow-hidden rounded-sm border">
    <Image
      src={awsURL + row.getValue('image')}
      width={48}
      height={48}
      style={{ objectFit: 'contain' }}
      alt="product image"
    />
  </div>
)

// Date created
const HeaderDateCreated = ({ column }) => (
  <ButtonSortable column={column}>날짜</ButtonSortable>
)

const CellDateCreated = ({ row }) => formatDate(row.getValue('dateCreated'))

const HeaderDescription = ({ column }) => (
  <ButtonSortable column={column}>설명</ButtonSortable>
)

export const getColumns = ({ removeVideo }) => {
  const CellDeleteVideo = ({ row }) => {
    const video = row.original
    return (
      <Button variant="destructive" onClick={() => removeVideo(video)}>
        삭제
      </Button>
    )
  }

  const columns = [
    {
      accessorKey: 'dateCreated',
      cell: CellDateCreated,
      filterFn: filterDateBetween,
      header: HeaderDateCreated,
    },
    {
      accessorKey: 'image',
      cell: CellProductImage,
      header: '영상',
    },

    {
      accessorKey: 'description',
      header: HeaderDescription,
    },
    {
      cell: CellDeleteVideo,
      header: '삭제',
    },
  ]
  return columns
}
