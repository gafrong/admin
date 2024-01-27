import awsURL from '@/assets/common/awsUrl'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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

const formatDate = (dateString) => {
  const dateObject = new Date(dateString)
  const year = dateObject.getFullYear()
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObject.getDate().toString().padStart(2, '0')
  return `${year}.${month}.${day}`
}

const CellDateCreated = ({ row }) => {
  const date = formatDate(row.getValue('dateCreated'))
  // const date = row.getValue('dateCreated').split('T')[0].split('-').join('.')
  return date
}

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
      header: '날짜',
      filterFn: (row, id, filterValue) => {
        // date: "2023-08-25T04:42:31.809Z"

        const date = row
          .getValue('dateCreated')
          .split('T')[0]
          .split('-')
          .join('.')
        console.log('filter row', row, {
          date,
          T: row.getValue('dateCreated'),
          filterValue,
        })
        return date.includes(filterValue)
      },
    },
    {
      accessorKey: 'image',
      cell: CellProductImage,
      header: '영상',
    },

    {
      accessorKey: 'description',
      header: '설명',
    },
    {
      cell: CellDeleteVideo,
      header: '삭제<',
    },
  ]
  return columns
}
