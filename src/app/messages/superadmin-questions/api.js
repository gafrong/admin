import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { hasLatestMessageRead } from '@/components/chat/utils/message-status'
import { authRequest } from '@/utils/authRequest'
import { useSession } from 'next-auth/react'

export function useSuperadminQuestions(isSuperAdmin = false) {
  const { data: session } = useSession()
  const userRole = session?.user?.role
  const endpoint =
    isSuperAdmin ?
      'superadminQuestions'
    : `superadminQuestions/user/${session?.user?.id}`

  const { data, error, isLoading, mutate } = useFetchAuth(endpoint)
  const processedData = Array.isArray(data) ? data : data?.data || []

  // Calculate unread count using our utility function
  const unreadCount = processedData.reduce(
    (count, superadminQuestion) =>
      count + (!hasLatestMessageRead(superadminQuestion, userRole) ? 1 : 0),
    0,
  )

  return { data: processedData, error, isLoading, unreadCount, mutate }
}

export function useSuperadminQuestion(questionId) {
  return useFetchAuth(questionId ? `superadminQuestions/${questionId}` : null)
}

export async function createSuperadminQuestion(data) {
  return authRequest('superadminQuestions', {
    method: 'POST',
    data,
  })
}

export async function addMessage(questionId, text, userId) {
  return authRequest(`superadminQuestions/${questionId}/answers`, {
    method: 'POST',
    data: { text, userId },
  })
}

export async function deleteSuperadminQuestion(questionId) {
  return authRequest(`superadminQuestions/${questionId}`, {
    method: 'DELETE',
  })
}

export async function markAsRead(questionId) {
  try {
    // Simplified endpoint - always marks latest answer as read based on user role
    return authRequest(`superadminQuestions/${questionId}/read-status`, {
      method: 'PUT',
      data: {}, // Send empty object to satisfy body-parser
    })
  } catch (error) {
    console.error('Error marking message as read:', error)
    throw error
  }
}
