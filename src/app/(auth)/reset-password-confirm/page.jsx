'use client'

import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  // const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const passwordEmail = useUserStore((state) => state.email)
  const clear = useUserStore((state) => state.clearEmail)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (verificationCode === '' || password === '') {
      setError('정보를 정확히 입력해주세요')
    }

    if (password !== confirmPassword) {
      return setError('비밀번호가 일치하지 않습니다')
    }

    try {
      // collect the information on onchange method from the inputs
      let data = {
        email: passwordEmail,
        verificationCode: verificationCode,
        password: password,
      }

      axios
        .post(`${baseURL}users/resetPasswordConfirm`, data)
        .then((res) => {
          if (res.status == 200) {
            // clears global email address
            clear()
            router.push('/')
          }
        })
        .catch((error) => {
          setError(error)
          console.log('There is an axios error resetting password confirm')
        })
    } catch (error) {
      setError(error.message)
      router.push('/reset-password-confirm')
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value
    console.log('value', inputValue)
    setConfirmPassword(inputValue)
  }
  return (
    <main className="ml-[-120px] grid min-h-screen place-items-center">
      <div className="flex min-h-full w-80 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                인증번호
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setVerificationCode(e.target.value)}
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
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
                  새로운 비밀번호
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                  새로운 비밀번호 확인
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleConfirmPasswordChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && (
              <div>
                <p className="text-red-600">
                  입력에 문제가 발생했습니다. 다시 시도해보세요
                </p>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                비밀번호 변경
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            로그인을 원하세요?{' '}
            <Link
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
