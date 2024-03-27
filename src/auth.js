import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: {
      label: 'User Name',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },
  async authorize(credentials) {
    if (credentials.username === 'sk' && credentials.password === '123')
      return {
        name: 'Vahid',
      }
    else return null
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
