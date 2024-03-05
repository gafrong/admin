'use client'

import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'

import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const setPasswordEmail = useUserStore((state) => state.setEmail)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '') {
            setError('정보를 정확히 입력해주세요')
        }

        try {
            const data = {
                email,
            }

            await axios.post(`${baseURL}users/resetPassword`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.data.success) {
                    setPasswordEmail(email)
                    router.push('/reset-password-confirm')
                } else {
                    setError('비밀번호를 재설정하는데 문제가 발생했습니다. 다시 시도해보세요')
                }
            });
        } catch (error) {
            setError(error.message)
        }
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
                                이메일 주소
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {error && (
                            <div>
                                <p className="text-red-600">
                                    입력에 문제가 발생했습니다. 다시 시도해보세요.
                                </p>
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                인증번호 보내기
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




