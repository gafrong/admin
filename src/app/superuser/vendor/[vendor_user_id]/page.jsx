'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { CardDescription } from '@/components/ui/card'

const VendorPage = ({ params }) => {
  const userId = params.vendor_user_id
  console.log({ userId })
  // get vendor by user id
  const url = userId ? `vendor/user-id/${userId}` : null
  const {
    data: vendor,
    error,
    isLoading,
    mutate: refetchVendor,
  } = useFetchAuth(url)

  return (
    <PageContainer>
      <PageTitle>Vendor</PageTitle>
      <CardDescription className="mb-20">{userId}</CardDescription>
      <pre>{JSON.stringify(vendor, null, 2)}</pre>
    </PageContainer>
  )
}

export default VendorPage
