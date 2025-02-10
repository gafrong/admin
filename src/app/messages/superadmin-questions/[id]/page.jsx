'use client'

import { Chat } from '@/components/chat/chat'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { getLastItem } from '@/utils/array-utils'
import { hasSuperAdminRole } from '@/utils/user-utils'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  markAsRead,
  useSuperadminQuestion,
  useSuperadminQuestions,
} from '../api'

export default function SuperadminQuestionDetails() {
  const params = useParams()
  const questionId = params.id

  const { data: session } = useSession()
  const { user = {} } = session || {}
  const isSuperAdmin = hasSuperAdminRole(user)

  const {
    data: superadminQuestion,
    isLoading,
    isError,
    mutate: refetchQuestion,
  } = useSuperadminQuestion(questionId)

  const { mutate: refetchQuestions } = useSuperadminQuestions(isSuperAdmin)

  // Mark messages as read when admin views them (superadmin doesn't need to mark as read)
  useEffect(() => {
    if (questionId && superadminQuestion) {
      const lastAnswer = getLastItem(superadminQuestion.answers)
      const isFromOtherRole = lastAnswer && lastAnswer.userId.role !== user.role
      // Mark as read if there's a last answer and:
      // - For superadmin: last message is from admin
      // - For admin: last message is from superadmin
      if (isFromOtherRole) {
        markAsRead(questionId).then(() => {
          refetchQuestion()
          refetchQuestions()
        })
      }
    }
  }, [
    isSuperAdmin,
    questionId,
    superadminQuestion,
    refetchQuestion,
    refetchQuestions,
  ])

  if (isError) {
    return <div>Error loading question</div>
  }

  if (isLoading || !superadminQuestion) {
    return <div>Loading...</div>
  }

  const handleMessageSent = () => {
    refetchQuestion() // Update current question view
    refetchQuestions() // Update unread count in sidenav
  }

  return (
    <PageContainer>
      <PageTitle>Admin Support</PageTitle>
      <Chat
        superadminQuestion={superadminQuestion}
        onMessageSent={handleMessageSent}
        session={session}
      />
    </PageContainer>
  )
}
