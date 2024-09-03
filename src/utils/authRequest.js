import axios from 'axios'
import baseURL from '@/assets/common/baseUrl'

export const authRequest = async (url, options = {}) => {
  const { method = 'GET', data = null, headers = {} } = options
  
  try {
    const config = {
      method,
      url: `${baseURL}${url}`,
      headers: {
        'Content-Type': 'application/json',
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
