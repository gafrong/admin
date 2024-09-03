import Link from 'next/link'
import { ButtonSortable } from '@/components/data-table/data-table-button-sorting'

const HeaderQueryType = ({ column }) => (
  <ButtonSortable column={column}>Query Type</ButtonSortable>
)

const HeaderMessageCount = ({ column }) => (
  <ButtonSortable column={column}>Messages</ButtonSortable>
)

const HeaderLastMessageContent = ({ column }) => (
  <ButtonSortable column={column}>Last Message</ButtonSortable>
)

const HeaderLastMessageTime = ({ column }) => (
  <ButtonSortable column={column}>Last Message Time</ButtonSortable>
)

export const getColumns = () => [
  {
    accessorKey: 'queryType',
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
    accessorKey: 'lastMessageContent',
    header: HeaderLastMessageContent,
    id: 'lastMessageContent',
    cell: ({ row }) => {
      const messages = row.original.messages;
      return messages.length > 0 ? messages[messages.length - 1].content : 'No messages';
    },
  },
  {
    accessorKey: 'lastMessage',
    header: HeaderLastMessageTime,
    id: 'lastMessageTime',
    cell: ({ row }) => {
      const lastMessage = row.original.lastMessage;
      if (lastMessage) {
        try {
          return new Date(lastMessage).toLocaleString();
        } catch (error) {
          console.error('Error parsing date:', error);
          return 'Invalid date';
        }
      }
      return 'No messages';
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
  { id: 'lastMessageContent', label: 'Last Message' },
]

export const controls = {
  isSearchAlwaysShown: true,
  searchableColumnHeaders,
  columnVisibilityToggles: true,
}
