import { format } from 'date-fns'

export function formatChatMessageTime(timestamp) {
  const messageDate = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now - messageDate) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (diffInHours < 48) {
    return 'Yesterday'
  } else {
    return messageDate.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
}

export function formatTableDate(timestamp) {
  if (!timestamp) return 'no date'
  return format(new Date(timestamp), 'yyyy.MM.dd')
}
