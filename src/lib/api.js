import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { authRequest } from '@/utils/authRequest'

export const useVendorSupportQueries = (userId) => {
  return useFetchAuth(userId ? `vendor-support-query/user/${userId}` : null)
}

export const useVendorSupportQuery = (id) => {
  return useFetchAuth(`vendor-support-query/${id}`)
}

export const useVendorSupportQueryMessages = (id) => {
  return useFetchAuth(`vendor-support-query/${id}/messages`)
}

export const createVendorSupportQuery = async (data, token) => {
  console.log('Sending data:', JSON.stringify(data, null, 2))
  console.log('Token:', token) // Log the token for debugging
  try {
    const response = await authRequest('vendor-support-query/', {
      method: 'POST',
      data,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('Response:', JSON.stringify(response, null, 2))
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
