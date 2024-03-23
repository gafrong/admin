'use client'

import baseURL from '@/assets/common/baseUrl'
import { ButtonLoader } from '@/components/LoadingSpinner'
import { PageTitle } from '@/components/typography/PageTitle'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import format from 'date-fns/format'
import { useEffect, useState } from 'react'

const findBy = ({ arr, key, value }) =>
  arr?.find((item) => item[key] === value) || null

export default function Page({ params }) {
  const token = useUserStore((state) => state?.token)
  const sellerId = useUserStore((state) => state.user)?._id
  const url = `questions/vendor/${sellerId}`
  const { data: questions, mutate } = useFetchAuth(url)
  const selectedUserQuestion = findBy({
    arr: questions,
    key: '_id',
    value: params.id,
  })
  const [isReplyEditingActive, setReplyEditingActive] = useState(false)
  const [replyText, setReplyText] = useState(
    selectedUserQuestion?.replies?.[0]?.content || '',
  )
  const isExistingReply = Boolean(selectedUserQuestion?.replies?.[0])

  useEffect(() => {
    setReplyText(selectedUserQuestion?.replies?.[0]?.content || '')
  }, [selectedUserQuestion])

  if (!selectedUserQuestion) return null

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Customer questions</PageTitle>

      <div className="flex flex-col gap-4">
        <TableQuestionDetail selectedUserQuestion={selectedUserQuestion} />
        <ReplyEditing
          isExistingReply={isExistingReply}
          isReplyEditingActive={isReplyEditingActive}
          mutate={mutate}
          replyText={replyText}
          selectedUserQuestion={selectedUserQuestion}
          setReplyEditingActive={setReplyEditingActive}
          setReplyText={setReplyText}
          token={token}
        />
      </div>
    </div>
  )
}

const TableQuestionDetail = ({ selectedUserQuestion }) => {
  const formattedDate =
    selectedUserQuestion?.dateCreated ?
      format(new Date(selectedUserQuestion?.dateCreated), 'yyyy.MM.dd')
    : 'no date'

  return (
    <div className="rounded-md border">
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="w-40" scope="row">
              questionType
            </TableHead>
            <TableCell>{selectedUserQuestion?.questionType}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">Customer</TableHead>
            <TableCell>
              {selectedUserQuestion?.userId?.name} (
              {selectedUserQuestion?.userId?.username})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">Date</TableHead>
            <TableCell>{formattedDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">Question</TableHead>
            <TableCell className="py-8 text-base">
              {selectedUserQuestion.detail}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const ReplyEditing = ({
  isExistingReply,
  isReplyEditingActive,
  token,
  mutate,
  replyText,
  selectedUserQuestion,
  setReplyEditingActive,
  setReplyText,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const ButtonSend = () => {
    return (
      <ButtonLoader
        className="mt-auto"
        disabled={!replyText}
        isLoading={isLoading}
        onClick={isExistingReply ? handleEditReply : handleCreateReply}
      >
        Send
      </ButtonLoader>
    )
  }

  const handleCancel = () => {
    setReplyEditingActive(false)
  }

  const handleEditReply = async () => {
    if (!isExistingReply) return
    const url = `${baseURL}questions/replies/${selectedUserQuestion.replies[0]._id}`
    try {
      setIsLoading(true)
      await axios({
        method: 'put',
        url,
        data: {
          content: replyText,
          replyId: selectedUserQuestion.replies[0]._id,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      mutate()
      setReplyEditingActive(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateReply = async () => {
    if (isExistingReply) return
    const url = `${baseURL}questions/${selectedUserQuestion._id}/replies`
    const data = {
      content: replyText,
      questionId: selectedUserQuestion._id,
      userId: selectedUserQuestion.userId._id,
      vendorId: selectedUserQuestion.vendorId,
    }

    try {
      setIsLoading(true)
      await axios({
        method: 'post',
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      mutate()
      setReplyText('')
      setReplyEditingActive(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteReply = async (replyId) => {
    if (!replyId) return
    const devURL = `http://localhost:3000/api/questions/replies/${replyId}`
    try {
      setIsLoading(true)
      await axios({
        method: 'delete',
        url: devURL,
        data: {
          replyId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mt-4 flex flex-col">
        {isReplyEditingActive ?
          <ButtonCancel handleCancel={handleCancel} />
        : <ButtonReply
            setReplyEditingActive={setReplyEditingActive}
            replyText={replyText}
          />
        }
      </div>

      {isExistingReply && !isReplyEditingActive && (
        <QuestionReplyStaticDisplay
          selectedUserQuestion={selectedUserQuestion}
        />
      )}

      {/* Live editing */}
      <div className="flex flex-col gap-4">
        {isReplyEditingActive && (
          <div className="rounded border p-4">
            <Label htmlFor="replyText" className="mb-4 block">
              Comment
            </Label>
            <div className="flex">
              <Textarea
                id="replyText"
                onChange={(e) => setReplyText(e.target.value)}
                value={replyText}
              />
              <div className="flex flex-col gap-4 pl-4">
                <ButtonSend />

                {/* change false to true to see delete button for debugging */}
                {isExistingReply && false && (
                  <ButtonDelete
                    handleDeleteReply={handleDeleteReply}
                    selectedUserQuestion={selectedUserQuestion}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function ButtonCancel({ handleCancel }) {
  return (
    <Button className="ml-auto" onClick={handleCancel} variant="outline">
      Cancel
    </Button>
  )
}

function ButtonReply({ setReplyEditingActive, replyText }) {
  return (
    <Button className="ml-auto" onClick={() => setReplyEditingActive(true)}>
      {replyText ? 'Edit' : 'Reply'}
    </Button>
  )
}

function ButtonDelete({ handleDeleteReply, selectedUserQuestion }) {
  return (
    <Button
      variant="destructive"
      onClick={() => handleDeleteReply(selectedUserQuestion.replies?.[0]._id)}
    >
      Delete
    </Button>
  )
}

function QuestionReplyStaticDisplay({ selectedUserQuestion }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableBody>
          <TableRow>
            <TableHead scope="row" className="w-40">
              Comment
            </TableHead>
            <TableCell className="py-8 text-base">
              {selectedUserQuestion.replies.map((reply, index) => (
                <div key={index} className={`text-left`}>
                  {reply.content}
                </div>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
