'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ProfileImage } from '@/components/typography/ProfileImage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardTitleDescription } from '../_components/card-title-description'
import { FormTextInputs } from '../_components/form-text-inputs'
import { convertBase64ToFile } from '../_components/image'

export const formFinanceSchema = z.object({
  bankName: z.string().min(1, { message: 'Required' }), // if you need a custom message
  accountName: z.string().min(1, { message: 'Required' }),
  accountNumber: z.string().min(1, { message: 'Required' }),
  image: z.any(), // You might want to add more specific validation for the image
})

const fields = [
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
  const { data: vendor, isLoading: isLoadingAuth } = useFetchAuth(url)
  const [previewImage, setPreviewImage] = React.useState(null)
  let isInitialImageLoaded

  const form = useForm({
    resolver: zodResolver(formFinanceSchema), // You need to create this schema
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
    },
  })

  // Pre-fill image on page refresh
  React.useEffect(() => {
    if (vendor?.document && !isInitialImageLoaded) {
      setPreviewImage(awsURL + vendor.document)
      isInitialImageLoaded = true
    }
  }, [session, vendor])

  // Pre-fill form data on page refresh
  React.useEffect(() => {
    if (!vendor?.bank) {
      return
    }
    const {
      bank: { bankName, accountNumber, accountName },
    } = vendor
    form.reset({
      accountName: accountName || '',
      accountNumber: `${accountNumber}` || '',
      bankName: bankName || '',
    })
  }, [vendor, form])

  const onSubmit = async (data) => {
    const URL_ENDPOINT = `${baseURL}vendor/profile-form/business`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const image = convertBase64ToFile(previewImage)
    const formData = new FormData()
    image && formData.append('document', image)
    formData.append('bankName', data.bankName)
    formData.append('accountNumber', `${data.accountNumber}`) // account number should be a string
    formData.append('accountName', data.accountName)

    try {
      const response = await axios.patch(URL_ENDPOINT, formData, { headers })

      if (response.status !== 200) {
        throw new Error('Error updating vendor')
      }

      const updatedVendor = response.data
      console.log('Success:', updatedVendor)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const isLoading =
    isLoadingAuth || status === 'loading' || form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="relative mx-auto max-w-screen-xl p-6">
          {isLoading && (
            <LoadingSpinner className="absolute inset-0 flex h-full items-center justify-center bg-black bg-opacity-5" />
          )}
          <CardTitleDescription
            title="Business Information"
            description="정산 계좌 변경은 ‘정보 변경 신청 메뉴에서 서류 제출이 필요합니다.
          Request Information Change"
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <FormTextInputs fields={fields} form={form} />
          </CardContent>

          <CardTitleDescription
            title="Business Registration"
            description="Request Business Registration Change"
          />
          <CardContent className="my-6">
            <ProfileImage
              form={form}
              // type="docs"
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
            />
          </CardContent>

          <div>
            <Button type="submit" className="ml-44">
              Save
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
}
