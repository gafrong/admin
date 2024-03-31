'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../../@/components/ui/button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.isAdmin) {
      router.push('/dashboard')
    } else if (session?.user?.submitted) {
      router.push('/welcome')
    } else if (status === 'authenticated') {
      router.push('/onboarding')
    }
  }, [session, status, router])

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (!email || !password) {
      setError('정확히 입력해주세요 11')
      return
    }

    try {
      const response =
        (await signIn('credentials', {
          // callbackUrl: '/dashboard',
          email,
          password,
          redirect: false,
        })) || {}
      if (response.error) {
        console.error('Login page signIn error:', { response })
        setError(response.error)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!!session?.user) return <YouAreAuthenticated user={session.user} />

  return (
    <div className="ml-[30px] w-80 px-6 py-12 text-center lg:px-8">
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
                <p className="text-red-600">
                  로그인에 문제가 있습니다. 다시 시도해보세요
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
