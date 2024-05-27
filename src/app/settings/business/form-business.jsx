'use client'

import { ProfileImage } from '@/components/typography/ProfileImage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormTextInputs } from '../_components/form-text-inputs'
import { HeaderTitleDescription } from '../contacts/form-manager-details'

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
  const form = useForm({
    resolver: zodResolver(formFinanceSchema), // You need to create this schema
    defaultValues: {
      bankName: '',
      accountName: '',
      accountNumber: '',
    },
  })

  const onSubmit = async (data) => {
    // Handle form submission here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="relative mx-auto max-w-screen-xl p-6">
          <HeaderTitleDescription
            title="Business Information"
            description="정산 계좌 변경은 ‘정보 변경 신청 메뉴에서 서류 제출이 필요합니다.
          Request Information Change"
          />
          <CardContent className="">
            <FormTextInputs fields={fields} form={form} />
          </CardContent>

          <HeaderTitleDescription
            title="Business Registration"
            description="Request Business Registration Change"
          />
          <CardContent className="">
            <ProfileImage form={form} type="docs" />{' '}
            {/* Assuming you want to use the same ProfileImage component for image upload */}
            <div>
              <Button type="submit" className="ml-44">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
