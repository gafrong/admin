'use client'

import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { SuperadminQuestionList } from './_components/superadmin-question-list'

export default function SuperadminQuestionsPage() {
  return (
    <PageContainer>
      <PageTitle>Superadmin Questions</PageTitle>
      <SuperadminQuestionList />
    </PageContainer>
  )
}
