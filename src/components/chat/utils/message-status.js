import { getLastItem } from '@/utils/array-utils'

// Determines if the latest message needs to be marked as read
export const hasLatestMessageRead = (question, currentUserRole) => {
  const answers = question.answers
  const isNewQuestion = !answers?.length
  const isSuperAdmin = currentUserRole === 'superAdmin'
  if (isNewQuestion) return true

  const lastAnswer = getLastItem(answers)

  // If superadmin is viewing:
  if (isSuperAdmin) {
    // Return true for superadmin messages (no indicator needed)
    if (lastAnswer.userId.role === 'superAdmin') return true
    // For admin messages, check isRead status
    return lastAnswer.isRead
  }

  // For admin viewing:
  return lastAnswer.isRead
}

// For superadmin view only - checks if question needs a reply (red indicator)
export function needsReplyFromUser(question) {
  const answers = question.answers
  const isNewQuestion = !answers?.length
  // New questions always need a reply from superadmin
  if (isNewQuestion) return true

  // Check if last message was from admin
  const lastAnswer = getLastItem(answers)
  const isFromAdmin = lastAnswer.userId.role === 'admin'

  // Need reply if last message is from admin
  return isFromAdmin
}
