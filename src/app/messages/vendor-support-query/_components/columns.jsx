import { ProfileMini } from '@/app/superuser/users/page'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Badge } from '@/components/ui/badge'
import { ifDate } from '@/lib/utils'
import Link from 'next/link'

// Table filters
// -----------------------------------------------------------------------------
const filterFirstMessageContent = (row, id, value) => {
  return row.original.messages[0].content
    .toLowerCase()
    .includes(value.toLowerCase())
}

const filterUser = (row, id, value) => {
  const participants = row.original.participants
  if (participants && participants.length > 0) {
    const user = participants[0]
    return (
      (user?.name && user.name.toLowerCase().includes(value.toLowerCase())) ||
      (user?.email && user.email.toLowerCase().includes(value.toLowerCase()))
    )
  }
  return false
}

const filterQueryType = (row, id, value) => {
  return row.original.queryType.toLowerCase().includes(value.toLowerCase())
}

// Table Components
// -----------------------------------------------------------------------------
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
    accessorKey: 'participants',
    cell: CellUser,
    filterFn: filterUser,
    header: 'User',
    id: 'user',
  },
  {
    accessorKey: 'queryType',
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.queryType}</Badge>
    ),
    filterFn: filterQueryType,
    header: HeaderQueryType,
    id: 'queryType',
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
    filterFn: filterFirstMessageContent,
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

export const controls = {
  isSearchAlwaysShown: true,
  // searchableColumnHeaders,
  // columnVisibilityToggles: true,
}
