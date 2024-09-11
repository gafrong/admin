'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()
  const user = session?.user
  const router = useRouter()

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (!email || !password) {
      setError('정확히 입력해주세요')
      return
    }

    try {
      const response = await signIn('credentials', {
        callbackUrl: '/dashboard',
        email,
        password,
        redirect: false,
      });

      console.log('Login response:', response);

      if (response?.error) {
        console.error('Login failed:', { response });
        if (response.status === 403) {
          setError('Access denied. You do not have permission to log in or your account may be inactive.');
        } else if (response.status === 401) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
        setIsLoading(false);
        return;
      }

      if (response?.ok) {
        console.log('Login successful');
        router.push('/dashboard');
      } else {
        console.log('Unexpected state:', { response, status });
        setError('An unexpected error occurred. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
        console.error('Error status:', error.response.status)
        console.error('Error headers:', error.response.headers)
      } else if (error.request) {
        console.error('Error request:', error.request)
      } else {
        console.error('Error message:', error.message)
      }
      setError(
        'An unexpected error occurred. Please try again later or contact support.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!!session?.user) return <YouAreAuthenticated user={session.user} />

  return (
    <div className="w-80 px-6 text-center lg:px-8">
      <div className="flex min-h-full flex-1 flex-col justify-center  ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="이메일 주소"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && (
              <div>
                <p className="text-red-600">{error}</p>
                <p className="mt-2 text-sm text-gray-500">
                  If this problem persists, please contact support.
                </p>
              </div>
            )}
            <div>
              <Button
                className="w-full"
                type="submit"
                variant={isLoading ? 'outline' : 'default'}
                disabled={isLoading}
              >
                로그인
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            판매자 입점을 원하세요?{' '}
            <Link
              href="/partner-register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              판매자 회원가입
            </Link>
          </p>
        </div>
      </div>
      <Link href="/reset-password">
        <p className="self-center justify-self-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          비밀번호 재설정
        </p>
      </Link>
    </div>
  )
}

export default Login

const handleSignOut = async () => {
  await signOut({ callbackUrl: `/` })
}

const YouAreAuthenticated = ({ user }) => (
  <div className="flex flex-col gap-4">
    <p>You are logged in</p>
    <Button onClick={handleSignOut}>Sign out</Button>
    <p>{user?.email}</p>
  </div>
)
