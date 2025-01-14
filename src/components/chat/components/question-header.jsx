'use client'

import { deleteSuperadminQuestion } from '@/app/messages/superadmin-questions/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { hasSuperAdminRole } from '@/utils/user-utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { formatTableDate } from '../utils/chat-utils'

export function QuestionHeader({ superadminQuestion, session }) {
  const router = useRouter()
  const isSuperAdmin = hasSuperAdminRole(session?.user)
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle undefined query during loading
  if (!superadminQuestion) {
    return <div>Loading...</div>
  }

  const {
    userId,
    _id: questionId,
    createdAt,
    answers = [],
    question,
    questionType,
  } = superadminQuestion

  const handleDelete = async () => {
    if (!session?.token || !isSuperAdmin) {
      console.error('Unauthorized: Only superAdmin can delete queries')
      return
    }

    setIsDeleting(true)
    try {
      await deleteSuperadminQuestion(questionId)
      router.push('/messages/superadmin-questions')
    } catch (error) {
      console.error('Error deleting query:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 rounded-md border">
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="w-40" scope="row">
                  Type
                </TableHead>
                <TableCell>{questionType}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">Admin</TableHead>
                <TableCell>
                  {userId.name}
                  {userId.role && (
                    <Badge variant="secondary" className="ml-2">
                      {userId.role || ''}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">Date</TableHead>
                <TableCell>{formatTableDate(createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">Question</TableHead>
                <TableCell className="py-8 text-base">{question}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">Status</TableHead>
                <TableCell>
                  <Badge variant={answers.length > 0 ? 'success' : 'warning'}>
                    {answers.length > 0 ? 'Replied' : 'Pending'}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {isSuperAdmin && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <AiOutlineDelete className="h-5 w-5" />
            <span className="sr-only">Delete question</span>
          </Button>
        )}
      </div>
    </div>
  )
}
