import { useFetchAuth } from '@/app/fetch/use-fetch-auth'

const baseURL = 'http://localhost:3001/api/v1/'

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
  const response = await fetch(`${baseURL}vendor-support-query/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const updateVendorSupportQuery = async (id, data, token) => {
  const response = await fetch(`${baseURL}vendor-support-query/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const deleteVendorSupportQuery = async (id, token) => {
  const response = await fetch(`${baseURL}vendor-support-query/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export const addMessageToVendorSupportQuery = async (id, data, token) => {
  const response = await fetch(`${baseURL}vendor-support-query/${id}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
