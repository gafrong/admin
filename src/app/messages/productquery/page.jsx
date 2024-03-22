'use client'

import { PageTitle } from '@/components/typography/PageTitle'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/zustand'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { TableProductQuery } from './table-product-query'
import { UserQuestionReply } from './user-question-reply'

export default function Page() {
  const [questions, setQuestions] = useState([])
  const [selectedUserQuestion, setSelectedUserQuestion] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useUserStore((state) => state?.token)
  const isQuestionReplyView = searchParams.get('question') !== null

  // update local state after CRUD operations, so we avoid a page refresh
  const replaceRepliesById = ({ id, newReply }) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === id ? { ...question, replies: [newReply] } : question,
      ),
    )
  }

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
      <TableProductQuery setSelectedUserQuestion={setSelectedUserQuestion} />

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
