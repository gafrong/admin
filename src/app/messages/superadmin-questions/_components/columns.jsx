import {
  hasLatestMessageRead,
  needsReplyFromUser,
} from '@/components/chat/utils/message-status'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'
import { Badge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/user-avatar'
import { cn, ifDate } from '@/lib/utils'
import { getLastItem } from '@/utils/array-utils'
import Link from 'next/link'

// Table filters
const filterQuestion = (row, id, value) => {
  return row.original.question.toLowerCase().includes(value.toLowerCase())
}

const filterAdmin = (row, id, value) => {
  const searchValue = value.toLowerCase()
  return row.original.userId.name.toLowerCase().includes(searchValue)
}

const filterQuestionType = (row, id, value) => {
  return row.original.questionType.toLowerCase().includes(value.toLowerCase())
}

// Table Components: Header
const HeaderQuestionType = ({ column }) => (
  <ButtonSortable column={column}>Question Type</ButtonSortable>
)

const HeaderQuestion = ({ column }) => (
  <ButtonSortable column={column}>Question</ButtonSortable>
)

const HeaderAdmin = ({ column }) => (
  <ButtonSortable column={column}>Admin</ButtonSortable>
)

const HeaderCreatedAt = ({ column }) => (
  <ButtonSortable column={column}>Created</ButtonSortable>
)

const HeaderReadIndicator = () => (
  <div className="w-[4px] border-l-4 border-blue-500 !p-0" />
)

// Table Components: Cell
const cellAdmin = ({ row }) => {
  const { image, name, username } = row.original.userId

  return (
    <div className="relative flex items-center gap-2">
      <UserAvatar image={image} name={name} size={8} />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-500">@{username}</span>
      </div>
    </div>
  )
}

const cellQuestionType = ({ row }) => row.original.questionType

const cellQuestion = ({ row }) => row.original.question

const cellCreatedAt = ({ row }) => {
  const date = new Date(row.original.createdAt)
  return (
    <div>
      <div>{ifDate(date)}</div>
      <div className="text-xs text-gray-500">{date.toLocaleTimeString()}</div>
    </div>
  )
}

const cellStatus = ({ row }) => (
  <Badge variant={row.original.repliedBySuperadmin ? 'success' : 'warning'}>
    {row.original.repliedBySuperadmin ? 'Replied' : 'Pending'}
  </Badge>
)

const cellActions = ({ row }) => (
  <Link
    className="text-blue-500 underline"
    href={`/messages/superadmin-questions/${row.original._id}`}
  >
    View
  </Link>
)
const isReplyNeeded = (question, isSuperAdmin, userRole) => {
  const isReplied = !needsReplyFromUser(question)
  const isRead = hasLatestMessageRead(question, userRole)
  const lastAnswer = getLastItem(question.answers)

  if (isSuperAdmin) {
    return !isReplied // Superadmin needs to reply if question is not replied
  }
  // admin gets an indicator if superAdmin has replied.
  return lastAnswer?.userId.role === 'superAdmin' && !isRead // Admin needs to reply if last message is from superadmin and unread
}

const cellReadIndicator = ({ row, isSuperAdmin, userRole }) => {
  /**
   * Indicator States:
   *
   * SuperAdmin View:
   * - Red: Unread message from admin (needs reply)
   * - Yellow: Read message from admin (needs reply)
   * - No color: Message from superadmin (no reply needed)
   *
   * Admin View:
   * - Red: Unread message from superadmin
   * - No color: Read message or sent by admin
   */
  const question = row.original
  const needsReply = isReplyNeeded(question, isSuperAdmin, userRole)
  const isRead = hasLatestMessageRead(question, userRole)

  const classes = cn('absolute inset-0 border-l-4', {
    'border-yellow-500': isSuperAdmin && needsReply && isRead,
    'border-red-500': needsReply && !isRead,
  })

  return <div className={classes} />
}

export const getColumns = (isSuperAdmin) => [
  {
    id: 'readIndicator',
    header: HeaderReadIndicator,
    cell: (props) =>
      cellReadIndicator({
        ...props,
        isSuperAdmin,
        userRole: isSuperAdmin ? 'superAdmin' : 'admin',
      }),
    className: '!w-[4px] !p-0 relative',
    maxSize: 4,
    size: 4,
    minSize: 4,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'userId',
    header: HeaderAdmin,
    cell: cellAdmin,
    className: 'mr-4',
    filterFn: filterAdmin,
  },
  {
    accessorKey: 'questionType',
    header: HeaderQuestionType,
    cell: cellQuestionType,
    filterFn: filterQuestionType,
  },
  {
    accessorKey: 'question',
    header: HeaderQuestion,
    cell: cellQuestion,
    filterFn: filterQuestion,
  },
  {
    accessorKey: 'createdAt',
    header: HeaderCreatedAt,
    cell: cellCreatedAt,
  },
  {
    id: 'status',
    header: 'Status',
    cell: cellStatus,
  },
  {
    id: 'actions',
    cell: cellActions,
    size: 50,
    className: 'p-4 [&:has([role=checkbox])]:pr-0 align-top',
  },
]

export const controls = {
  isSearchAlwaysShown: true,
  searchableColumnHeaders: [
    { id: 'question', label: 'Question' },
    { id: 'userId', label: 'Admin' },
    { id: 'questionType', label: 'Question Type' },
  ],
}
