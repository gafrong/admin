'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import LoadingSpinner from '@/components/LoadingSpinner'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getColumns } from './columns'
import Question from './question'

export default function Page() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const vendorId = user?._id
  const columns = getColumns()
  console.log('questions', questions)
  useEffect(() => {
    axios
      .get(`${baseURL}questions/vendor/${vendorId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuestions(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('서버 연결에 문제가 있습니다:', error.message)
        setLoading(false)
      })
  }, [token])
  console.log('questions', questions)
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>고객 문의</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker: 'dateCreated' }}
        data={questions}
        isLoading={loading}
      />

      <div className="questions-list">
        {questions.map((question, index) => (
          <Question key={index} question={question} />
        ))}
      </div>
    </div>
  )
}

const example = {
  _id: '651e09b4f290e8780909d935',
  userId: {
    _id: '6369e336bada7fee40de1ba5',
    name: '이지지',
    image: 'profiles/53f43df8-9114-40b0-8bea-661f006e817d',
    username: 'ninalee.lmlmkjnkjnkj',
    id: '6369e336bada7fee40de1ba5',
  },
  title: 'gogogo',
  detail: 'gogogog\n',
  productId: null,
  vendorId: {
    _id: '6369e336bada7fee40de1ba5',
    name: '이지지',
    image: 'profiles/53f43df8-9114-40b0-8bea-661f006e817d',
    username: 'ninalee.lmlmkjnkjnkj',
    id: '6369e336bada7fee40de1ba5',
  },
  repliedByVendor: true,
  replies: [
    {
      _id: '6528f05675c9e092a913a376',
      questionId: '651e09b4f290e8780909d935',
      userId: '6369e336bada7fee40de1ba5',
      vendorId: '6369e336bada7fee40de1ba5',
      content: 'Njkkjnjknljknljnlnlk milk ok ok lk k',
      readByUser: true,
      dateCreated: '2023-10-13T07:23:02.981Z',
      __v: 0,
      id: '6528f05675c9e092a913a376',
    },
  ],
  dateCreated: '2023-10-05T00:56:20.006Z',
  __v: 1,
  id: '651e09b4f290e8780909d935',
}
