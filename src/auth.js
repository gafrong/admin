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

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    try {
      console.log('Attempting login with credentials:', credentials)
      const response = await axios.post(`${baseURL}admin/login`, credentials, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      console.log('Login response:', response.data)
      const data = response.data
      if (data.user) return data
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS)
    } catch (error) {
      console.error(LOG_PREFIX.AUTH_ERROR, error.message)

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
          error.response.data || AUTH_ERRORS.AUTHENTICATION_FAILED,
        )
      }

      // Generic fallback error
      console.error(LOG_PREFIX.UNKNOWN_ERROR, error)
      throw new Error(AUTH_ERRORS.AUTHENTICATION_FAILED)
    }
  },
})

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
      if (user) {
        token.user = user.user
        // store the user token taken from the backend and store it in the session
        token.token = user.token
      }
      // ***************************************************************
      // add functionality to update the session.user after a CRUD operation
      if (trigger === 'update' && session) {
        token.user = session.user
        return token
      }
      // **************************************************************
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
