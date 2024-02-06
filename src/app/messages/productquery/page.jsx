'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getColumns, searchableColumnHeaders } from './columns'

export default function Page() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const vendorId = user?._id
  const columns = getColumns()
  console.log('questions', questions)

  const getMessages = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${baseURL}questions/vendor/${vendorId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setQuestions(response.data)
      console.log('messages', messages)
    } catch (error) {
      console.log('fetch Messages error', error)
      console.log('서버 연결에 문제가 있습니다:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMessages()
  }, [token])

  const dateRangePicker = 'dateCreated'

  return (

    <div className="py-10 pl-5 pr-2">
      <PageTitle>고객 문의</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker, searchableColumnHeaders }}
        data={questions}
        isLoading={loading}
      />
    </div>
  )
}
