'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox' // Import Checkbox component

import { Form, FormDescription } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormTextInputs } from '../_components/form-text-inputs'

const formManagerDetailsSchema = z.object({
  storeManagerName: z.string().min(1, { message: 'Required' }), // if you need a custom message
  storeManagerEmail: z.string().email(),
  storeManagerMobile: z.string(),
  customerServiceManagerName: z.string(),
  customerServiceManagerContactNumber: z.string(),
  financeManagerName: z.string(),
  financeManagerEmail: z.string().email(),
  financeManagerMobile: z.string(),
})

const storeManagerFields = [
  {
    autocomplete: 'name',
    label: 'Name*',
    name: 'storeManagerName',
    type: 'text',
  },
  {
    autocomplete: 'email',
    label: 'Email*',
    name: 'storeManagerEmail',
    type: 'email',
  },
  {
    autocomplete: 'tel',
    description: 'Your phone number will not be exposed to the public.',
    label: 'Mobile Number*',
    name: 'storeManagerMobile',
    placeholder: '+82 12 1234 5678',
    type: 'tel',
  },
  {
    autocomplete: 'tel',
    label: 'Phone Number',
    name: 'storeManagerPhone',
    placeholder: '+82 12 1234 5678',
    type: 'tel',
  },
]

const customerServiceManagerFields = [
  {
    autocomplete: 'name',
    label: 'Name*',
    name: 'customerServiceManagerName',
    type: 'text',
  },
  {
    autocomplete: 'tel',
    description: 'Your phone number will not be exposed to the public.',
    label: 'Contact Number*',
    name: 'customerServiceManagerContactNumber',
    placeholder: '+82 12 1234 5678',
    type: 'tel',
  },
]

const financeManagerFields = [
  {
    autocomplete: 'name',
    label: 'Name*',
    name: 'financeManagerName',
    type: 'text',
  },
  {
    autocomplete: 'email',
    label: 'Email*',
    name: 'financeManagerEmail',
    type: 'email',
  },
  {
    autocomplete: 'tel',
    description: 'Your phone number will not be exposed to the public.',
    label: 'Mobile Number*',
    name: 'financeManagerMobile',
    placeholder: '+82 12 1234 5678',
    type: 'tel',
  },
]

export const HeaderTitleDescription = ({ title, description }) => (
  <CardHeader className="pt-12">
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
)

export function FormManagerDetails() {
  const { data: session } = useSession()
  const { token, user } = session || {}
  const userId = user?._id
  const url = userId ? `vendor/user-id/${userId}` : null

  const { data: vendor, isLoading, mutate } = useFetchAuth(url)
  // START pre-fill form data
  const form = useForm({
    resolver: zodResolver(formManagerDetailsSchema),
    defaultValues: {
      storeManagerName: '',
      storeManagerEmail: '',
      storeManagerMobile: '',
      storeManagerPhone: '',
      customerServiceManagerName: '',
      customerServiceManagerContactNumber: '',
      financeManagerName: '',
      financeManagerEmail: '',
      financeManagerMobile: '',
      sameAsStoreManager: false,
    },
  })
  const isSameAsStoreManager = form.watch('sameAsStoreManager')

  // Pre-fill form data on page refresh
  React.useEffect(() => {
    if (!vendor?.contacts) {
      console.log('No contacts found')
      return
    }
    const {
      contacts: { store, customerService, finance },
    } = vendor
    form.reset({
      storeManagerName: store?.name || '',
      storeManagerEmail: store?.email || '',
      storeManagerMobile: store?.mobile || '',
      storeManagerPhone: store?.phone || '',
      customerServiceManagerName: customerService.name || '',
      customerServiceManagerContactNumber: customerService.contactNumber || '',
      financeManagerName: finance.name || '',
      financeManagerEmail: finance.email || '',
      financeManagerMobile: finance.mobile || '',
      sameAsStoreManager: isSameAsStoreManager || false,
    })
  }, [vendor, form, isSameAsStoreManager])
  // END pre-fill form data

  const onSubmit = async (formData) => {
    const URL_ENDPOINT = `${baseURL}vendor/profile-form/managers`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    if (!token) {
      console.error('FormManagerDetails() No token found')
      return
    }
    const data = formatData(formData)
    try {
      const response = await axios.patch(URL_ENDPOINT, data, { headers })

      if (response.status !== 200) {
        throw new Error('Error updating vendor')
      }

      const updatedVendor = response.data
      console.log(updatedVendor)
    } catch (error) {
      console.error(error)
    }
  }
  const onSubmitTest = () => {
    console.log('test')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-screen-xl px-6 pb-10">
          <HeaderTitleDescription
            title="Store Manager"
            description="Please insert the contact information of the store manager."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <FormTextInputs fields={storeManagerFields} form={form} />
          </CardContent>

          <HeaderTitleDescription
            title="Customer Service Manager"
            description="Please insert the contact information of the store manager."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <div className="ml-44 flex gap-2">
              <SameAsStoreManagerCheckbox form={form} />

              <FormDescription>Same as store manager</FormDescription>
            </div>
            <FormTextInputs
              disabled={isSameAsStoreManager}
              fields={customerServiceManagerFields}
              form={form}
              key={isSameAsStoreManager ? 'same' : 'unique'}
            />
          </CardContent>

          <HeaderTitleDescription
            title="Finance Manager"
            description="We send the tax information to the respective manager."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <FormTextInputs fields={financeManagerFields} form={form} />
          </CardContent>

          <div className="ml-[200px] mt-8 flex gap-4">
            <Button type="submit" className="ml-44-off">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className=""
              onClick={onSubmitTest}
            >
              Test
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
}

function SameAsStoreManagerCheckbox({ form }) {
  return (
    <Controller
      control={form.control}
      name="sameAsStoreManager"
      render={({ field }) => (
        <Checkbox
          {...field}
          onCheckedChange={(checked) => {
            field.onChange(checked)
            if (checked) {
              const [storeManagerName, storeManagerMobile, storeManagerPhone] =
                form.getValues([
                  'storeManagerName',
                  'storeManagerMobile',
                  'storeManagerPhone',
                ])
              console.log('SameAsStoreManagerCheckbox() storeManagerName:', {
                storeManagerName,
                storeManagerMobile,
                storeManagerPhone,
              })
              const storeManagerNumber = storeManagerMobile || storeManagerPhone
              form.setValue('customerServiceManagerName', storeManagerName)
              form.setValue(
                'customerServiceManagerContactNumber',
                storeManagerNumber,
              )
            }
          }}
        />
      )}
    />
  )
}

function formatData(formData) {
  return {
    contacts: {
      store: {
        name: formData.storeManagerName,
        email: formData.storeManagerEmail,
        mobile: formData.storeManagerMobile,
        phone: formData.storeManagerPhone,
      },
      customerService: {
        name: formData.customerServiceManagerName,
        contactNumber: formData.customerServiceManagerContactNumber,
        sameAsStoreManager: formData.sameAsStoreManager,
      },
      finance: {
        name: formData.financeManagerName,
        email: formData.financeManagerEmail,
        mobile: formData.financeManagerMobile,
      },
    },
  }
}
