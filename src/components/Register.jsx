"use client";

import { useState } from "react";
import axios from "axios";
import baseURL from '@/assets/common/baseUrl';
import useUserStore from '@/store/zustand';
import { useRouter } from 'next/navigation';
import Link from "next/link";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const setUser = useUserStore((state) => state.setUser);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '' ){
            setError("정보를 정확히 입력해주세요")
        }

        if (password !== confirmPassword) {
           return setError("비밀번호를 확인해주세요")
        }
        let user = {
            email,
            password,
        };

        try {
            const response = await axios.post(`${baseURL}admin/register`, user)
            const data = response.data;
            const userData = data;
            const token = data.token;

            setUser(userData, token);
            router.push('/onboarding');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const inputValue = e.target.value; 
        console.log('value', inputValue)
        setConfirmPassword(inputValue);
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-80">
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                비밀번호
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                비밀번호 확인
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                            />
                        </div>
                    </div>
                    {error && (
                       <div><p className="text-red-600">입력에 문제가 있습니다. 다시 시도해보세요</p></div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            회원가입
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    로그인을 원하세요?{" "}
                    <Link
                        href="/"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register