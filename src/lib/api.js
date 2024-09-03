import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { authRequest } from '@/utils/authRequest'

export const useVendorSupportQueries = () => {
  const { data, error } = useFetchAuth('vendor-support-query')
  console.log('Vendor Support Queries:', data)
  console.log('Fetch Error:', error)
  return { data: Array.isArray(data) ? data : data?.data || [], error }
}

export const useVendorSupportQuery = (id) => {
  return useFetchAuth(`vendor-support-query/${id}`)
}

export const useVendorSupportQueryMessages = (id) => {
  return useFetchAuth(`vendor-support-query/${id}/messages`)
}

export const createVendorSupportQuery = async (data, token) => {
  try {
    const response = await authRequest('vendor-support-query/', {
      method: 'POST',
      data,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.error('Full error:', error)
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

export const updateVendorSupportQuery = async (id, data, token) => {
  return authRequest(`vendor-support-query/${id}`, {
    method: 'PUT',
    data,
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export const deleteVendorSupportQuery = async (id, token) => {
  return authRequest(`vendor-support-query/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export const addMessageToVendorSupportQuery = async (id, data, token) => {
  return authRequest(`vendor-support-query/${id}/messages`, {
    method: 'POST',
    data,
    headers: { 'Authorization': `Bearer ${token}` }
  })
}
