import { getLastItem } from '@/utils/array-utils'
import {
  hasLatestMessageRead,
  needsReplyFromUser,
} from '../chat/utils/message-status'

export const getQuestionCounts = (questions, isSuperAdmin) => {
  const userRole = isSuperAdmin ? 'superAdmin' : 'admin'

  // Count questions that would show red indicators (unread messages needing reply)
  const needsReplyCount =
    questions?.filter(
      (question) =>
        isReplyNeeded(question, isSuperAdmin, userRole) &&
        !hasLatestMessageRead(question, userRole),
    ).length ?? 0

  // Count questions that would show yellow indicators (read messages needing reply, superadmin only)
  const readNeedsReplyCount =
    isSuperAdmin ?
      questions?.filter(
        (question) =>
          isReplyNeeded(question, isSuperAdmin, userRole) &&
          hasLatestMessageRead(question, userRole),
      ).length ?? 0
    : 0

  return { needsReplyCount, readNeedsReplyCount }
}

export const isReplyNeeded = (question, isSuperAdmin, userRole) => {
  const isReplied = !needsReplyFromUser(question)
  const isRead = hasLatestMessageRead(question, userRole)
  const lastAnswer = getLastItem(question.answers)

  if (isSuperAdmin) {
    return !isReplied // Superadmin needs to reply if question is not replied
  }
  // admin gets an indicator if superAdmin has replied
  return lastAnswer?.userId.role === 'superAdmin' && !isRead
}
