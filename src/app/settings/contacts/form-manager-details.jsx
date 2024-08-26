'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox' // Import Checkbox component

import { Form, FormDescription } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardTitleDescription } from '../_components/card-title-description'
import { FormTextInputs } from '../_components/form-text-inputs'

const formManagerDetailsSchema = z.object({
  storeManagerName: z.string().min(1, { message: 'Required' }), // if you need a custom message
  storeManagerEmail: z.string().email(),
  storeManagerMobile: z.string(),
  customerServiceManagerName: z.string(),
  customerServiceManagerContactNumber: z.string(),
  financeManagerName: z.string(),
  financeManagerEmail: z.string().email('Please enter a valid email address'),
  financeManagerMobile: z.string(),
})

const formFields = {
  store: [
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
  ],
  customerService: [
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
  ],
  finance: [
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
  ],
}

export function FormManagerDetails() {
  const { data: session, status } = useSession()
  const { token, user } = session || {}
  const userId = user?._id
  const url = userId ? `vendor/user-id/${userId}` : null
  const { data: vendor, isLoading: isLoadingAuth } = useFetchAuth(url)

  const [isSameAsStoreManagerCS, setIsSameAsStoreManagerCS] =
    React.useState(false)

  const [isSameAsStoreManagerFM, setIsSameAsStoreManagerFM] =
    React.useState(false)

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
      sameAsStoreManagerCS: false,
    },
  })

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
      sameAsStoreManagerCS: isSameAsStoreManagerCS || false,
    })
  }, [vendor, form])

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
    } catch (error) {
      console.error(error)
    }
  }
  const isLoading =
    isLoadingAuth || status === 'loading' || form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="relative mx-auto max-w-screen-xl px-6 pb-10">
          {isLoading && (
            <LoadingSpinner className="absolute inset-0 flex h-full items-center justify-center bg-black bg-opacity-5" />
          )}

          <CardTitleDescription
            title="Store Manager"
            description="Please insert the contact information of the store manager."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <FormTextInputs fields={formFields.store} form={form} />
          </CardContent>

          <CardTitleDescription
            title="Customer Service Manager"
            description="Please insert the contact information of the store manager."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <SameAsStoreManagerCheckboxCS
              form={form}
              vendor={vendor}
              setIsSameAsStoreManagerCS={setIsSameAsStoreManagerCS}
            />
            <FormTextInputs
              disabled={isSameAsStoreManagerCS}
              fields={formFields.customerService}
              form={form}
              key={isSameAsStoreManagerCS ? 'same' : 'unique'}
            />
          </CardContent>

          <CardTitleDescription
            title="Finance Manager"
            description="We send the tax information to the respective manager."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <SameAsStoreManagerCheckboxFM
              form={form}
              vendor={vendor}
              setIsSameAsStoreManagerFM={setIsSameAsStoreManagerFM}
            />
            <FormTextInputs
              disabled={isSameAsStoreManagerFM}
              fields={formFields.finance}
              form={form}
            />
          </CardContent>

          <div className="ml-[200px] mt-8 flex gap-4">
            <Button type="submit" className="ml-44-off">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className=""
              onClick={() => console.log('test')}
            >
              What does cancel do?
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
}

function SameAsStoreManagerCheckboxCS({
  form,
  setIsSameAsStoreManagerCS,
  vendor,
}) {
  const handleCheckboxChange = (checked) => {
    setIsSameAsStoreManagerCS(checked)
    const { storeManagerName, storeManagerMobile, storeManagerPhone } =
      form.getValues()

    if (checked) {
      const storeManagerNumber = storeManagerMobile || storeManagerPhone
      form.setValue('customerServiceManagerName', storeManagerName)
      form.setValue('customerServiceManagerContactNumber', storeManagerNumber)
    } else {
      const customerService = vendor.contacts.customerService
      form.setValue('customerServiceManagerName', customerService.name || '')
      form.setValue(
        'customerServiceManagerContactNumber',
        customerService.contactNumber || '',
      )
    }
  }

  return (
    <div className="ml-44 flex gap-2">
      <Controller
        control={form.control}
        name="sameAsStoreManagerCS"
        render={({ field }) => (
          <Checkbox {...field} onCheckedChange={handleCheckboxChange} />
        )}
      />

      <FormDescription>Same as store manager</FormDescription>
    </div>
  )
}

function SameAsStoreManagerCheckboxFM({
  form,
  setIsSameAsStoreManagerFM,
  vendor,
}) {
  const handleCheckboxChangeFM = (checked) => {
    setIsSameAsStoreManagerFM(checked)
    const {
      storeManagerName,
      storeManagerEmail,
      storeManagerMobile,
      // storeManagerPhone,
    } = form.getValues()

    if (checked) {
      form.setValue('financeManagerName', storeManagerName)
      form.setValue('financeManagerEmail', storeManagerEmail)
      form.setValue('financeManagerMobile', storeManagerMobile)
      // form.setValue('financeManagerPhone', storeManagerPhone)
    } else {
      const finance = vendor.contacts.finance
      form.setValue('financeManagerName', finance.name || '')
      form.setValue('financeManagerEmail', finance.email || '')
      form.setValue('financeManagerMobile', finance.mobile || '')
      // form.setValue('financeManagerPhone', finance.phone || '')
    }
  }

  return (
    <div className="ml-44 flex gap-2">
      <Controller
        control={form.control}
        name="sameAsStoreManagerFM"
        render={({ field }) => (
          <Checkbox {...field} onCheckedChange={handleCheckboxChangeFM} />
        )}
      />

      <FormDescription>Same as store manager</FormDescription>
    </div>
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
