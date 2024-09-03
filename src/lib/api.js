import { useFetchAuth } from '@/app/fetch/use-fetch-auth'

export const useVendorSupportQueries = (userId) => {
  return useFetchAuth(userId ? `vendor-support-query/user/${userId}` : null)
}

export const useVendorSupportQuery = (id) => {
  return useFetchAuth(`vendor-support-query/${id}`)
}

export const useVendorSupportQueryMessages = (id) => {
  return useFetchAuth(`vendor-support-query/${id}/messages`)
}

export const useCreateVendorSupportQuery = (data) => {
  return useFetchAuth('vendor-support-query/', { method: 'POST', data })
}

export const useUpdateVendorSupportQuery = (id) => {
  const { executeRequest } = useFetchAuth(`vendor-support-query/${id}`)
  return (data) => executeRequest('PUT', data)
}

import { authRequest } from '@/utils/authRequest'

export const deleteVendorSupportQuery = async (id, token) => {
  return authRequest(`vendor-support-query/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const useAddMessageToVendorSupportQuery = (id) => {
  const { executeRequest } = useFetchAuth(`vendor-support-query/${id}/messages`)
  return (data) => executeRequest('POST', data)
}
