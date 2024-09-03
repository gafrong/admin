import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { authRequest } from '@/utils/authRequest'
import { useSession } from 'next-auth/react'

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
  return authRequest('vendor-support-query/', {
    method: 'POST',
    data,
    headers: { 'Authorization': `Bearer ${token}` }
  })
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
