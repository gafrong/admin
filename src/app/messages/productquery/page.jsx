'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import { cn } from '@/lib/utils'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders } from './columns'
import { UserMessageReply } from './user-message-reply'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedUserMessage, setSelectedUserMessage] = useState(null)
  const isMessageView = searchParams.get('view') === 'message'
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useUserStore((state) => state?.token)
  const vendor = useUserStore((state) => state.user)

  // update local state after CRUD operations, so we avoid a page refresh
  const replaceRepliesById = ({ id, newReply }) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === id ?
          { ...question, replies: [...question.replies, newReply] }
        : question,
      ),
    )
  }

  const vendorId = vendor?._id

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

  const handleRowClick = ({ row }) => {
    setSelectedUserMessage(row.original)
    router.push('?view=message')
  }

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>고객 문의</PageTitle>
      <DataTable
        columns={columns}
        className={cn(isMessageView && 'hidden')}
        controls={{
          dateRangePicker,
          searchableColumnHeaders,
          onRowClick: handleRowClick,
        }}
        data={questions}
        isLoading={loading}
      />
      <UserMessageReply
        className={cn(!isMessageView && 'hidden')}
        replaceRepliesById={replaceRepliesById}
        selectedUserMessage={selectedUserMessage}
        setSelectedUserMessage={setSelectedUserMessage}
        router={router}
        token={token}
        vendorId={vendorId}
      ></UserMessageReply>
    </div>
  )
}
