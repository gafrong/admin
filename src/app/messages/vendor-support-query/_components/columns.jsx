import { ProfileMini } from '@/app/superuser/users/page'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Badge } from '@/components/ui/badge'
import { ifDate } from '@/lib/utils'
import Link from 'next/link'

// Components
export const CellUser = ({ row }) => {
  const user = row?.original?.participants[0] || {}
  return <ProfileMini user={user} />
}

const HeaderQueryType = ({ column }) => (
  <ButtonSortable column={column}>Query Type</ButtonSortable>
)

const HeaderMessageCount = ({ column }) => (
  <ButtonSortable column={column}>No.</ButtonSortable>
)

const HeaderFirstMessage = ({ column }) => (
  <ButtonSortable column={column}>Query</ButtonSortable>
)

const HeaderLastMessageTime = ({ column }) => (
  <ButtonSortable column={column}>Time</ButtonSortable>
)

export const getColumns = () => [
  {
    header: 'User',
    accessorKey: 'participants',
    id: 'user',
    cell: CellUser,
  },
  {
    accessorKey: 'queryType',
    header: HeaderQueryType,
    id: 'queryType',
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.queryType}</Badge>
    ),
  },
  {
    accessorKey: 'messageCount',
    header: HeaderMessageCount,
    id: 'messageCount',
    cell: ({ row }) => row.original.messages.length,
  },
  {
    accessorKey: 'firstMessageContent',
    header: HeaderFirstMessage,
    id: 'firstMessageContent',
    cell: ({ row }) => {
      const messages = row.original.messages
      return messages.length > 0 ? messages[0].content : 'No messages'
    },
  },
  {
    accessorKey: 'lastMessageAt',
    header: HeaderLastMessageTime,
    id: 'lastMessageTime',
    cell: ({ row }) => {
      const lastMessageAt = row.original.lastMessageAt
      if (lastMessageAt) {
        try {
          const date = new Date(lastMessageAt)
          return (
            <div>
              <div>{ifDate(date)}</div>
              <div className="text-xs text-gray-500">
                {date.toLocaleTimeString()}
              </div>
            </div>
          )
        } catch (error) {
          console.error('Error parsing date:', error)
          return 'Invalid date'
        }
      }
      return 'No messages'
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link
        className="text-blue-500 underline"
        href={`/messages/vendor-support-query/${row.original._id}`}
      >
        View
      </Link>
    ),
  },
]

export const searchableColumnHeaders = [
  { id: 'queryType', label: 'Query Type' },
  { id: 'firstMessageContent', label: 'Query' },
]

export const controls = {
  isSearchAlwaysShown: true,
  searchableColumnHeaders,
  // columnVisibilityToggles: true,
}
