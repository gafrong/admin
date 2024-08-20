'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { CardTitleDescription } from '@/app/settings/_components/card-title-description'
import { SimpleTable } from '@/components/simple-table'
import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BusinessRegistrationDocument } from './_components/business-registration-document'
import {
  DEBUG_DeletePendingAccount,
  DEBUG_PromotePendingAccount,
  DebuggingTools,
} from './_components/debug'
import { DocumentHistory } from './_components/document-history'
import { SuperUserBankHistory } from './_components/super-user-bank-history'

export const formFinanceSchema = z.object({
  bankName: z.string().min(1, { message: 'Required' }), // if you need a custom message
  accountName: z.string().min(1, { message: 'Required' }),
  accountNumber: z.string().min(1, { message: 'Required' }),
  image: z.any(), // You might want to add more specific validation for the image
})

const bankTableHeaders = [
  { label: 'Bank', key: 'bankName' },
  { label: 'Account Name', key: 'accountName' },
  { label: 'Account Number', key: 'accountNumber' },
  { label: 'Edited At', key: 'uploadedAt' },
]

export function SuperuserBusiness({ userId }) {
  const { data: session, status } = useSession()
  const { token } = session || {}
  const url = userId ? `vendor/user-id/${userId}` : null
  console.log({ userId, url })
  const {
    data: vendor,
    isLoading: isLoadingAuth,
    mutate: refetchVendor,
  } = useFetchAuth(url)
  console.log({ vendor })
  const form = useForm({
    resolver: zodResolver(formFinanceSchema), // You need to create this schema
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
    },
  })

  const isLoading =
    isLoadingAuth || status === 'loading' || form.formState.isSubmitting

  return (
    <>
      {/* <pre>{JSON.stringify(vendor, null, 2)}</pre> */}
      <Card className="relative mx-auto max-w-screen-xl p-6 pt-0">
        <CardTitleDescription
          title="Business Information"
          description="정산 계좌 변경은 ‘정보 변경 신청 메뉴에서 서류 제출이 필요합니다.
          Request Information Change"
        />

        <div className="p-6">
          <SimpleTable
            className=""
            title="Current bank details"
            data={vendor?.bank ? [vendor?.bank] : null}
            headers={bankTableHeaders}
          />
        </div>

        {vendor?.isPendingBank ?
          <>
            <div className="flex flex-col gap-12 p-6">
              <SimpleTable
                className=""
                title="Pending bank details"
                data={[vendor?.pending?.bank]}
                headers={bankTableHeaders}
              />
            </div>
            <div className="flex gap-6 p-6">
              <DEBUG_DeletePendingAccount
                mutate={refetchVendor}
                token={token}
                userId={userId}
              />
              <DEBUG_PromotePendingAccount
                mutate={refetchVendor}
                token={token}
                userId={userId}
              />
            </div>
          </>
        : null}
      </Card>

      <BusinessRegistrationDocument
        form={form}
        isLoading={isLoading}
        refetchVendor={refetchVendor}
        token={token}
        vendor={vendor}
      />

      <SuperUserBankHistory bankHistory={vendor?.bankHistory} />

      <DocumentHistory documentHistory={vendor?.documentHistory} />

      <DebuggingTools
        refetchVendor={refetchVendor}
        token={token}
        userId={userId}
      />

      {/* <pre>{JSON.stringify(vendor, null, 2)}</pre> */}
    </>
  )
}
