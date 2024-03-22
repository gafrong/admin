'use client'

import baseURL from '@/assets/common/baseUrl'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useFetchProductQueries({ questions, setQuestions }) {
  const [isLoading, setIsLoading] = useState(false)
  const token = useUserStore((state) => state?.token)
  const seller = useUserStore((state) => state.user)
  const sellerId = seller?._id

  // update local state after CRUD operations, so we avoid a page refresh

  const getQuestions = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${baseURL}questions/vendor/${sellerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setQuestions(response.data)
    } catch (error) {
      console.log('서버 연결에 문제가 있습니다:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [token])

  return { questions, setQuestions, isLoading }
}
