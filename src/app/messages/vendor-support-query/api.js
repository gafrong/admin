import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { authRequest } from '@/utils/authRequest'

export const useVendorSupportQueries = (isSuperAdmin = false) => {
  const endpoint =
    isSuperAdmin ? 'vendor-support-query/all' : 'vendor-support-query'
  const { data, error, isLoading, mutate } = useFetchAuth(endpoint)

  const processedData = Array.isArray(data) ? data : data?.data || []

  // Calculate unread count based on user role
  const unreadCount = processedData.reduce((count, query) => {
    const lastMessage = query.messages?.[query.messages.length - 1]
    if (!lastMessage) return count

    // For superadmin view: check for unread admin messages
    // For admin view: check for unread superadmin messages
    const isReplyNeeded =
      isSuperAdmin ?
        lastMessage.sender?.role === 'admin'
      : lastMessage.sender?.role === 'superadmin'

    const isUnread = !lastMessage.readBy?.includes(
      query.participants[0]?.user?._id,
    )
    return count + (isReplyNeeded && isUnread ? 1 : 0)
  }, 0)

  return { data: processedData, error, isLoading, unreadCount, mutate }
}

export const useVendorSupportQuery = (queryId) =>
  useFetchAuth(`vendor-support-query/${queryId}`)

export const createVendorSupportQuery = async (data, token) => {
  try {
    const response = await authRequest('vendor-support-query/', {
      method: 'POST',
      data,
      token,
    })
    return response
  } catch (error) {
    console.error('createVendorSupportQuery() Full error:', error)
    if (error.response) {
      console.error('Error status:', error.response.status)
      console.error('Error data:', JSON.stringify(error.response.data, null, 2))
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error message:', error.message)
    }
    throw error
  }
}

export const deleteVendorSupportQuery = async (queryId, token) => {
  return authRequest(`vendor-support-query/${queryId}`, {
    method: 'DELETE',
    token,
  })
}

export const sendMessage = async (messageData, token) =>
  await authRequest('vendor-support-query/message', {
    method: 'POST',
    data: messageData,
    token,
  })
