import baseURL from '@/assets/common/baseUrl'
import axios from 'axios'

export const authRequest = async (url, options = {}) => {
  const { method = 'GET', data = null, headers = {}, token } = options

  if (!token) {
    throw new Error('Authentication required')
  }

  try {
    const config = {
      method,
      url: `${baseURL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
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
