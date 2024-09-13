import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { authRequest } from '@/utils/authRequest'

export const useVendorSupportQueries = (isSuperAdmin = false) => {
  const endpoint =
    isSuperAdmin ? 'vendor-support-query/all' : 'vendor-support-query'
  const { data, error, isLoading } = useFetchAuth(endpoint)

  const processedData = Array.isArray(data) ? data : data?.data || []

  return { data: processedData, error, isLoading }
}

export const useVendorSupportQuery = (queryId) => {
  return useFetchAuth(`vendor-support-query/${queryId}`)
}

export const createVendorSupportQuery = async (data, token) => {
  try {
    const response = await authRequest('vendor-support-query/', {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
    headers: { Authorization: `Bearer ${token}` },
  })
}
