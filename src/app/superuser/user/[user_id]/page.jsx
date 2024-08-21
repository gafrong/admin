'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { CardDescription } from '@/components/ui/card'

const VendorPage = ({ params }) => {
  const userId = params.user_id
  const { data, error, isLoading, mutate } = useFetchAuth(`users/${userId}`)

  return (
    <PageContainer>
      <PageTitle>User</PageTitle>
      <CardDescription className="mb-20">{userId}</CardDescription>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </PageContainer>
  )
}

export default VendorPage
