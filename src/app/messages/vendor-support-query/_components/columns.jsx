import { ProfileMini } from '@/app/superuser/users/page'
import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials, ifDate } from '@/lib/utils'
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
    const user = participants[0].user
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

// Table Components: Header
// -----------------------------------------------------------------------------
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

// Table Components: Cell
// -----------------------------------------------------------------------------
export const CellUser = ({ row }) => {
  const user = row?.original?.participants[0]?.user || {}
  const name = user.name || 'Unknown User'
  const imgSrc = user.image ? `${awsURL}${user.image}` : IMG.defaultProfile
  const initials = getInitials(name)

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={imgSrc} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </div>
  )
}

const cellQueryType = ({ row }) => (
  <Badge variant="outline">{row.original.queryType}</Badge>
)

const cellMessageCount = ({ row }) => row.original.messages.length

const cellFirstMessageContent = ({ row }) => {
  const messages = row.original.messages
  return messages.length > 0 ? messages[0].content : 'No messages'
}

const cellLastMessageAt = ({ row }) => {
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
}

const cellActions = ({ row }) => (
  <Link
    className="text-blue-500 underline"
    href={`/messages/vendor-support-query/${row.original._id}`}
  >
    View
  </Link>
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
    cell: cellQueryType,
    filterFn: filterQueryType,
    header: HeaderQueryType,
    id: 'queryType',
  },
  {
    accessorKey: 'messageCount',
    cell: cellMessageCount,
    header: HeaderMessageCount,
    id: 'messageCount',
  },
  {
    accessorKey: 'firstMessageContent',
    cell: cellFirstMessageContent,
    filterFn: filterFirstMessageContent,
    header: HeaderFirstMessage,
    id: 'firstMessageContent',
  },
  {
    accessorKey: 'lastMessageAt',
    cell: cellLastMessageAt,
    header: HeaderLastMessageTime,
    id: 'lastMessageTime',
  },
  {
    cell: cellActions,
    header: 'Actions',
    id: 'actions',
  },
]

export const controls = {
  isSearchAlwaysShown: true,
  // searchableColumnHeaders,
  // columnVisibilityToggles: true,
}
