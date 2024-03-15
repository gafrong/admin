'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { getColumns, searchableColumnHeaders } from './columns'
import { UserQuestionReply } from './user-question-reply'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedUserQuestion, setSelectedUserQuestion] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useUserStore((state) => state?.token)
  const vendor = useUserStore((state) => state.user)
  const isQuestionReplyView = searchParams.get('question') !== null
  const vendorId = vendor?._id
  const dateRangePicker = 'dateCreated'

  // update local state after CRUD operations, so we avoid a page refresh
  const replaceRepliesById = ({ id, newReply }) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === id ? { ...question, replies: [newReply] } : question,
      ),
    )
  }

  const getQuestions = async () => {
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
      console.log('서버 연결에 문제가 있습니다:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [token])

  const handleRowClick = ({ row }) => {
    setSelectedUserQuestion(row.original)
    router.push(`?question=${row.original._id}`)
  }
  const columns = getColumns(handleRowClick)

  const BackButton = () => {
    return isQuestionReplyView ?
        <Button
          className="mr-auto h-8 w-10 p-0 pr-2"
          onClick={() => {
            setSelectedUserQuestion(false)
            router.back()
          }}
          size="sm"
          variant="ghost"
        >
          <FiArrowLeftCircle size={24} />
        </Button>
      : null
  }

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>
        <BackButton />
        고객 문의
      </PageTitle>
      <DataTable
        columns={columns}
        className={isQuestionReplyView && 'hidden'}
        controls={{
          dateRangePicker,
          searchableColumnHeaders,
        }}
        data={questions}
        isLoading={loading}
      />
      <UserQuestionReply
        className={!isQuestionReplyView && 'hidden'}
        replaceRepliesById={replaceRepliesById}
        selectedUserQuestion={selectedUserQuestion}
        setSelectedUserQuestion={setSelectedUserQuestion}
        token={token}
      ></UserQuestionReply>
    </div>
  )
}
