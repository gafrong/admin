import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import baseURL from './assets/common/baseUrl'

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    try {
      // const user = { email: credentials.email, password: credentials.password }
      const response = await axios.post(`${baseURL}admin/login`, credentials, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const data = response.data
      if (data.user) return data.user
      throw new Error('Invalid credentials')
    } catch (error) {
      throw new Error('Failed to login')
    }
  },
})

const config = {
  providers: [credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middlewareProtected') return !!auth
      return true
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
