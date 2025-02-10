import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import baseURL from './assets/common/baseUrl'

const isDevelopment = process.env.NODE_ENV === 'development'

const LOG_PREFIX = {
  AUTH_ERROR: 'auth.js authorize() error:',
  HTTP_ERROR: 'HTTP Error:',
  UNKNOWN_ERROR: 'Unknown authentication error:',
}

const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found. Please check your email and try again.',
  BACKEND_NOT_RUNNING_DEV:
    'Backend server is not running. Please start the backend server and try again.',
  BACKEND_NOT_RUNNING_PROD:
    'Authentication service is temporarily unavailable. Please try again later.',
  AUTHENTICATION_FAILED: 'Authentication failed. Please try again later.',
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    const apiUrl = `${baseURL}admin/login`

    try {
      const response = await axios.post(apiUrl, credentials, {
        headers,
      })

      if (!response.data) {
        throw new Error(AUTH_ERRORS.AUTHENTICATION_FAILED)
      }

      const { user, message } = response.data
      if (!user) {
        throw new Error(message || AUTH_ERRORS.INVALID_CREDENTIALS)
      }

      // Return the complete response data to include message
      return response.data
    } catch (error) {
      console.error(LOG_PREFIX.AUTH_ERROR, {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      })

      // Axios specific error when server is unreachable
      if (axios.isAxiosError(error) && !error.response) {
        const message =
          isDevelopment ?
            AUTH_ERRORS.BACKEND_NOT_RUNNING_DEV
          : AUTH_ERRORS.BACKEND_NOT_RUNNING_PROD
        throw new Error(message)
      }

      if (error.response?.data === 'The user not found') {
        throw new Error(AUTH_ERRORS.USER_NOT_FOUND)
      }

      if (error.response) {
        console.error(LOG_PREFIX.HTTP_ERROR, {
          status: error.response.status,
          data: error.response.data,
        })
        throw new Error(
          error.response.data?.message || AUTH_ERRORS.AUTHENTICATION_FAILED,
        )
      }

      // Generic fallback error
      console.error(LOG_PREFIX.UNKNOWN_ERROR, error)
      throw new Error(AUTH_ERRORS.AUTHENTICATION_FAILED)
    }
  },
})

/**
 * Checks if a JWT token has expired
 * @param {string} token - The JWT token to validate
 * @returns {boolean} True if token is expired or invalid, false otherwise
 */
const hasTokenExpired = (token) => {
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]))
    // JWT exp is in seconds, Date.now() is in milliseconds
    const tokenExpirationTime = tokenPayload.exp * 1000
    return Date.now() >= tokenExpirationTime
  } catch (error) {
    console.error('Error checking token expiration:', error)
    // Consider invalid tokens as expired for security
    return true
  }
}

const config = {
  providers: [credentialsConfig],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login/email',
  },
  callbacks: {
    authorized({ request, auth }) {
      return !!auth?.user
    },
    async jwt({ token, user, trigger, session }) {
      // Initial sign in - backend returns { message, user }
      if (user) {
        token.user = user.user
        token.token = user.user.token
      }

      // Update user data after CRUD operations
      if (trigger === 'update' && session) {
        token.user = session.user
        return token
      }

      // Check token expiration
      if (token.token && hasTokenExpired(token.token)) {
        console.log('Token expired in jwt callback')
        // Return null to clear the session
        return null
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
        session.token = token.token
      }
      return session
    },
  },
}

export const { auth, handlers, signIn, signOut, update } = NextAuth(config)
