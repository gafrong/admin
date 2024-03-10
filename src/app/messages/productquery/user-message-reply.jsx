import baseURL from '@/assets/common/baseUrl'
import { ButtonLoader } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import axios from 'axios'
import format from 'date-fns/format'
import { useState } from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'

export const UserMessageReply = ({
  className,
  selectedUserMessage,
  setSelectedUserMessage,
  token,
  replaceRepliesById,
  router,
  vendorId,
}) => {
  const [isReplyIsActive, setReplyIsActive] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    const URL = `${baseURL}questions/${selectedUserMessage._id}/replies`
    try {
      setIsLoading(true)
      const response = await axios.post(
        URL,
        {
          content: replyText,
          questionId: selectedUserMessage._id,
          // userId: selectedUserMessage.userId._id,
          userId: vendorId,
          vendorId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // the following 8 lines update the local state, so we avoid a page refresh
      setSelectedUserMessage((prevState) => ({
        ...prevState,
        replies: [...prevState.replies, response.data],
      }))
      replaceRepliesById({
        id: selectedUserMessage._id,
        newReply: response.data,
      })
      setReplyIsActive(false)
      setReplyText('')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setReplyIsActive(false)
    setReplyText('')
  }

  if (!selectedUserMessage) return null

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Button
        className="mr-auto"
        onClick={() => {
          setSelectedUserMessage(false)
          router.back()
        }}
        size="sm"
        variant="ghost"
      >
        <FiArrowLeftCircle size={24} />
      </Button>

      <div className="rounded-md border">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead scope="row">Subject</TableHead>
              <TableCell>{selectedUserMessage.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">Customer</TableHead>
              <TableCell>
                {selectedUserMessage.userId.name} (
                {selectedUserMessage.userId.username})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">Date</TableHead>
              <TableCell>
                {format(
                  new Date(selectedUserMessage.dateCreated),
                  'yyyy.MM.dd',
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">detail</TableHead>
              <TableCell>{selectedUserMessage.detail}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {selectedUserMessage.replies.length > 0 && (
          <div className="flex flex-col gap-2 border-t px-4 py-4">
            {selectedUserMessage.replies.map((reply, index) => (
              <div
                key={index}
                className={`rounded-md border p-4 ${
                  reply.userId === reply.vendorId ?
                    'ml-16 bg-slate-50'
                  : 'mr-16 border'
                }`}
              >
                {reply.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {isReplyIsActive ?
          <div className="flex gap-4">
            <ButtonLoader
              className="ml-auto"
              disabled={!replyText}
              onClick={handleSend}
              isLoading={isLoading}
            >
              Send
            </ButtonLoader>
            <Button className="" onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        : <Button className="ml-auto" onClick={() => setReplyIsActive(true)}>
            Reply
          </Button>
        }
        {isReplyIsActive && (
          <Textarea
            onChange={(e) => setReplyText(e.target.value)}
            value={replyText}
          />
        )}
      </div>

      <pre>
        <br />
        {JSON.stringify(selectedUserMessage, null, 2)}
      </pre>
    </div>
  )
}
