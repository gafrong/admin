import awsURL from '@/assets/common/awsUrl'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

// Table filters
// -----------------------------------------------------------------------------

export function filterDateBetween(rows, id, filterValues) {
  const [start, end] = filterValues
  const startDate = start && new Date(start).getTime()
  let endDate = end && new Date(end)

  // add 24 hours to the end date so that it is inclusive
  endDate.setDate(endDate.getDate() + 1)
  endDate = endDate.getTime()

  if (!(endDate || startDate)) {
    return false
  }

  const cellDate = new Date(rows.getValue('dateCreated')).getTime()

  if (endDate && startDate) {
    return cellDate >= startDate && cellDate <= endDate
  }

  if (startDate) {
    return cellDate >= startDate
  }

  if (endDate) {
    return cellDate <= endDate
  }

  return false
}

export const searchableColumnHeaders = [
  { id: 'dateCreated', label: '날짜', placeholder: '검색 날짜...' },
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
        <div className="h-18 w-12 overflow-hidden rounded-sm border">
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

const formatDate = (dateString) => {
  const dateObject = new Date(dateString)
  const year = dateObject.getFullYear()
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObject.getDate().toString().padStart(2, '0')
  return `${year}.${month}.${day}`
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