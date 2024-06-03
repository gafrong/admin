'use client'

import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
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

const formDeliverySchema = z.object({
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  zipCode: z.string(),
})

const deliveryAddressFields = [
  { label: 'Address 1', name: 'address1', type: 'text' },
  { label: 'Address 2', name: 'address2', type: 'text' },
  { label: 'City', name: 'city', type: 'text' },
  { label: 'Zip Code', name: 'zipCode', type: 'text' },
]

export function FormDelivery() {
  const { data: session } = useSession()
  const { token, user } = session || {}
  const userId = user?._id
  const url = userId ? `vendor/user-id/${userId}` : null
  const { data: vendor, isLoading, mutate } = useFetchAuth(url)

  // START pre-fill form data
  const form = useForm({
    resolver: zodResolver(formDeliverySchema),
    defaultValues: {
      address1: '',
      address2: '',
      city: '',
      zipCode: '',
    },
  })

  // Pre-fill form data on page refresh
  React.useEffect(() => {
    if (!vendor?.deliveryAddress) {
      console.log('No delivery address found')
      return
    }
    const { address1, address2, city, zipCode } = vendor.deliveryAddress
    form.reset({
      address1: address1 || '',
      address2: address2 || '',
      city: city || '',
      zipCode: zipCode || '',
    })
  }, [user, form, vendor])
  // END pre-fill form data

  const onSubmit = async (formValues) => {
    const URL_ENDPOINT = `${baseURL}vendor/profile-form/delivery`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    if (!token) {
      console.error('FormDelivery() No token found')
      return
    }

    try {
      const response = await axios.patch(URL_ENDPOINT, formValues, { headers })

      if (response.status !== 200) {
        throw new Error('Error updating vendor')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-screen-xl px-6 pb-10">
          <CardTitleDescription
            title="Delivery address for returns"
            description="출고지와 반품에 사용할 주소를 등록합니다."
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <FormTextInputs fields={deliveryAddressFields} form={form} />
          </CardContent>
          <div className="ml-[200px] mt-8 flex gap-4">
            <Button type="submit" className="ml-44-off">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className=""
              onClick={() => {
                console.log('test')
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>

        <Card className="mx-auto mt-10 max-w-screen-xl px-6 pt-0">
          <CardTitleDescription
            title="Goods Flow Registration"
            description="굿스플로 송장출력 서비스 및 반품 택배 자동 수거 서비스를 이용할 수 있습니다. 
            출고지와 반품지 주소가 동일한 경우에만 굿스플로를 사용할 수 있습니다. "
          />
          <CardContent className="mt-6 flex flex-col gap-6">
            <div className=" mt-8 flex gap-4">
              <Button type="submit" className="ml-44-off">
                Not registered
              </Button>
              <Button
                type="button"
                variant="outline"
                className=""
                onClick={() => console.log('test')}
              >
                굿스플로 신청/관리
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
