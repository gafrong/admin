'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { SuperuserBusiness } from '@/app/superuser/business/super-user-business'
import { PageContainer } from '@/components/typography/PageTitle'

const VendorPage = ({ params }) => {
  const userId = params.vendor_user_id
  console.log({ params })
  const url = userId ? `vendor/user-id/${userId}` : null
  const {
    data: vendor,
    error,
    isLoading,
    mutate: refetchVendor,
  } = useFetchAuth(url)

  console.log({ vendor, vendor_id: userId })

  return (
    <PageContainer>
      <SuperuserBusiness userId={userId} />
    </PageContainer>
  )
}

export default VendorPage
