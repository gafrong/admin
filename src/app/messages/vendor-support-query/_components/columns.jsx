import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials, ifDate } from '@/lib/utils'
import cn from 'classnames'
import Link from 'next/link'

// Table filters
// -----------------------------------------------------------------------------
const filterFirstMessageContent = (row, id, value) => {
  return row.original.messages[0].content
    .toLowerCase()
    .includes(value.toLowerCase())
}

const filterUser = (row, id, value) => {
  const user = row.original.participants?.[0]?.user
  const searchValue = value.toLowerCase()

  return (
    user?.name?.toLowerCase()?.includes(searchValue) ||
    user?.username?.toLowerCase()?.includes(searchValue)
  )
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
  const messages = row.original.messages
  const lastMessage = messages[messages.length - 1]
  const needsReply = lastMessage?.sender?.role === 'admin'

  const name = user.name || 'Unknown User'
  const username = user.username || 'No Username'
  const imgSrc = user.image ? `${awsURL}${user.image}` : IMG.defaultProfile
  const initials = getInitials(name)

  return (
    <div className="relative flex items-center gap-2">
      {needsReply && (
        <div className="absolute -bottom-4 -left-4 -top-4 w-1 bg-red-500" />
      )}
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={imgSrc} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-500">@{username}</span>
      </div>
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

export const getColumns = (options = { isSuperAdminView: false }) =>
  [
    options.isSuperAdminView && {
      accessorKey: 'participants',
      cell: CellUser,
      filterFn: filterUser,
      header: 'User',
      id: 'user',
    },
    options.isSuperAdminView && {
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
      size: 50,
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
      id: 'lastMessageAt',
    },
    {
      id: 'actions',
      cell: cellActions,
      size: 50,
    },
  ].filter(Boolean)

export const controls = {
  isSearchAlwaysShown: true,
  // searchableColumnHeaders,
  // columnVisibilityToggles: true,
}
