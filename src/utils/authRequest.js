import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'
import { getSession } from 'next-auth/react'

const isDevelopment = process.env.NODE_ENV !== 'production'

export const authRequest = async (url, options = {}) => {
  const { method = 'GET', data = null, headers = {} } = options
  const session = await getSession()

  const token = session?.token
  if (!token) {
    throw new Error('Authentication required')
  }

  const config = {
    method,
    url: `${baseURL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data,
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    if (isDevelopment) {
      console.error('Request failed:', {
        url,
        method,
        status: error.response?.status,
        message: error.message,
      })
    }

    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please login again.')
    } else {
      throw error
    }
  }
}
