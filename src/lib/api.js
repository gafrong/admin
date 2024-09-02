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

export const useCreateVendorSupportQuery = () => {
  const { executeRequest } = useFetchAuth('vendor-support-query/')
  return (data) => executeRequest('POST', data)
}

export const useUpdateVendorSupportQuery = (id) => {
  const { executeRequest } = useFetchAuth(`vendor-support-query/${id}`)
  return (data) => executeRequest('PUT', data)
}

export const useDeleteVendorSupportQuery = (id) => {
  const { executeRequest } = useFetchAuth(`vendor-support-query/${id}`)
  return () => executeRequest('DELETE')
}

export const useAddMessageToVendorSupportQuery = (id) => {
  const { executeRequest } = useFetchAuth(`vendor-support-query/${id}/messages`)
  return (data) => executeRequest('POST', data)
}
