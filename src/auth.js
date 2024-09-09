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
      console.log('Attempting login with credentials:', credentials);
      const response = await axios.post(`${baseURL}admin/login`, credentials, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      console.log('Login response:', response.data);
      const data = response.data
      if (data.user) return data
      console.error('Login failed: Invalid credentials');
      throw new Error('Invalid credentials')
    } catch (error) {
      console.error('auth.js authorize() error:', error.response ? error.response.data : error.message);
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      throw new Error(error.response ? error.response.data : 'Failed to login')
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
