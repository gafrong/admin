'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import { SimpleTable } from '@/components/simple-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardTitleDescription } from '../_components/card-title-description'
import { FormTextInputs } from '../_components/form-text-inputs'
import { BankHistory } from './_components/bank-history'
import { BusinessRegistrationDocument } from './_components/business-registration-document'
import { DebuggingTools } from './_components/debug'
import { DocumentHistory } from './_components/document-history'

export const formFinanceSchema = z.object({
  bankName: z.string().min(1, { message: 'Required' }), // if you need a custom message
  accountName: z.string().min(1, { message: 'Required' }),
  accountNumber: z.string().min(1, { message: 'Required' }),
  image: z.any(), // You might want to add more specific validation for the image
})

const bankFields = [
  {
    label: 'Bank Name',
    name: 'bankName',
    type: 'text',
  },
  {
    label: 'Account Name',
    name: 'accountName',
    type: 'text',
  },
  {
    label: 'Account Number',
    name: 'accountNumber',
    type: 'text',
  },
]

export function FormBusiness() {
  const { data: session, status } = useSession()
  const { token, user } = session || {}
  const userId = user?._id
  const url = userId ? `vendor/user-id/${userId}` : null
  const {
    data: vendor,
    isLoading: isLoadingAuth,
    mutate: refetchVendor,
  } = useFetchAuth(url)

  const form = useForm({
    resolver: zodResolver(formFinanceSchema), // You need to create this schema
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
    },
  })

  // Pre-fill form data on page refresh
  React.useEffect(() => {
    const bankData =
      vendor?.isPendingBank ? vendor?.pending?.bank : vendor?.bank
    if (!bankData) {
      return
    }
    const { bankName, accountNumber, accountName } = bankData
    form.reset({
      accountName: accountName || '',
      accountNumber: `${accountNumber}` || '',
      bankName: bankName || '',
    })
  }, [vendor, form, vendor?.isPendingBank])

  const isLoading =
    isLoadingAuth || status === 'loading' || form.formState.isSubmitting

  // First form submit handler
  const onSubmitBank = async (data) => {
    console.log('data', data)
    const URL_ENDPOINT = `${baseURL}vendor/profile-form/bank`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const formData = new FormData()
    formData.append('bankName', data.bankName)
    formData.append('accountNumber', `${data.accountNumber}`) // account number should be a string
    formData.append('accountName', data.accountName)
    const formValues = formatData(formData)

    try {
      const response = await axios.patch(URL_ENDPOINT, formValues, { headers })

      if (response.status !== 200) {
        throw new Error('Error updating vendor')
      }

      refetchVendor()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Form {...form}>
        <Card className="relative mx-auto max-w-screen-xl p-6 pt-0">
          <CardTitleDescription
            title="Business Information"
            description="정산 계좌 변경은 ‘정보 변경 신청 메뉴에서 서류 제출이 필요합니다.
          Request Information Change"
          />

          {vendor?.isPendingBank ?
            <>
              <div className="flex flex-col gap-12 p-6">
                <SimpleTable
                  className=""
                  title="Current bank details"
                  data={[vendor?.bank]}
                  headers={[
                    { label: 'Bank', key: 'bankName' },
                    { label: 'Account Name', key: 'accountName' },
                    { label: 'Account Number', key: 'accountNumber' },
                  ]}
                />

                <SimpleTable
                  className=""
                  title="Pending bank details"
                  data={[vendor?.pending?.bank]}
                  headers={[
                    { label: 'Bank', key: 'bankName' },
                    { label: 'Account Name', key: 'accountName' },
                    { label: 'Account Number', key: 'accountNumber' },
                  ]}
                />
              </div>
            </>
          : <form onSubmit={form.handleSubmit(onSubmitBank)}>
              {isLoading && (
                <LoadingSpinner className="absolute inset-0 flex h-full items-center justify-center bg-black bg-opacity-5" />
              )}

              <CardDescription className="pl-6 pt-6">
                Bank Details
              </CardDescription>
              <CardContent className="mt-6 flex flex-col gap-6">
                <FormTextInputs fields={bankFields} form={form} />
              </CardContent>

              <div>
                <Button type="submit" className="ml-6">
                  Save
                </Button>
              </div>
            </form>
          }
        </Card>

        <BusinessRegistrationDocument
          form={form}
          isLoading={isLoading}
          refetchVendor={refetchVendor}
          token={token}
          vendor={vendor}
        />
      </Form>

      <BankHistory bankHistory={vendor?.bankHistory} />

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

function formatData(formData) {
  return {
    bankName: formData.get('bankName'),
    accountNumber: formData.get('accountNumber'),
    accountName: formData.get('accountName'),
  }
}
export function BankDetailsTable({ bank, title }) {
  if (!bank) return null

  const bankDetails = [
    {
      item: 'Bank',
      value: bank.bankName,
    },
    {
      item: 'Account Name',
      value: bank.accountName,
    },
    {
      item: 'Account Number',
      value: bank.accountNumber,
    },
  ]

  return (
    <div className="p-6">
      <CardDescription className="pb-6">{title}</CardDescription>
      <Table className="">
        <TableBody>
          {bankDetails.map((bankDetail) => (
            <TableRow key={bankDetail.item}>
              <TableHead className="font-medium">{bankDetail.item}</TableHead>
              <TableCell>{bankDetail.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
