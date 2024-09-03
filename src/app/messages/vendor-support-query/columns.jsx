import Link from 'next/link'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'

const HeaderQueryType = ({ column }) => (
  <ButtonSortable column={column}>Query Type</ButtonSortable>
)

const HeaderLastMessage = ({ column }) => (
  <ButtonSortable column={column}>Last Message Time</ButtonSortable>
)

const HeaderLastMessageContent = ({ column }) => (
  <ButtonSortable column={column}>Last Message</ButtonSortable>
)

const HeaderCreatedAt = ({ column }) => (
  <ButtonSortable column={column}>Created At</ButtonSortable>
)

export const getColumns = () => [
  {
    accessorKey: 'queryType',
    header: HeaderQueryType,
    id: 'queryType',
  },
  {
    accessorKey: 'lastMessage',
    header: HeaderLastMessage,
    id: 'lastMessage',
    cell: ({ row }) => new Date(row.original.lastMessage).toLocaleString(),
  },
  {
    accessorKey: 'lastMessageContent',
    header: HeaderLastMessageContent,
    id: 'lastMessageContent',
    cell: ({ row }) => {
      const messages = row.original.messages;
      return messages.length > 0 ? messages[messages.length - 1].content : 'No messages';
    },
  },
  {
    accessorKey: 'createdAt',
    header: HeaderCreatedAt,
    id: 'createdAt',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
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
  { id: 'lastMessageContent', label: 'Last Message' },
]

export const controls = {
  isSearchAlwaysShown: true,
  searchableColumnHeaders,
  columnVisibilityToggles: true,
}
