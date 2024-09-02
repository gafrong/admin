import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import axios from 'axios'

const baseURL = 'http://localhost:3001/api/v1/'

// Helper function for authenticated requests
const authRequest = async (method, url, data = null, token) => {
  try {
    const config = {
      method,
      url: `${baseURL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data ? JSON.stringify(data) : undefined,
    }
    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

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
  return authRequest('POST', 'vendor-support-query/', data, token)
}

export const updateVendorSupportQuery = async (id, data, token) => {
  return authRequest('PUT', `vendor-support-query/${id}`, data, token)
}

export const deleteVendorSupportQuery = async (id, token) => {
  return authRequest('DELETE', `vendor-support-query/${id}`, null, token)
}

export const addMessageToVendorSupportQuery = async (id, data, token) => {
  return authRequest('POST', `vendor-support-query/${id}/messages`, data, token)
}
