'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
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
import axios from 'axios'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormTextInputs } from '../_components/form-text-inputs'
import { formGeneralSchema } from './form-general-schema'

const fields = [
  {
    autocomplete: 'name',
    label: 'First name*',
    name: 'name',
    type: 'text',
    placeholder: 'John Doe',
  },
  {
    autocomplete: 'username',
    label: 'Username*',
    name: 'username',
    type: 'text',
    placeholder: 'JohnDoe',
  },
  {
    description: 'Describe your shop in a few words.',
    label: 'Shop Description*',
    name: 'brandDescription',
    type: 'text',
  },
  {
    label: 'Link',
    name: 'link',
    type: 'text',
  },
  {
    label: 'Brand*',
    name: 'brand',
    type: 'text',
  },
]

const convertBase64ToFile = (imageBase64) => {
  // Convert image base64 string to a Blob
  // a blob is the same as a file, which is what the backend expects.
  // the base64 image is needed for previewing the image in the browser.

  const isBase64 = /^data:image\/[a-zA-Z+]*;base64,/.test(imageBase64)
  if (!isBase64) {
    return imageBase64
  }

  const byteString = atob(imageBase64.split(',')[1])
  const mimeString = imageBase64.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeString })
  return blob
}

export function FormGeneral() {
  const { data: session } = useSession()
  const token = session?.token
  const isExistingImage = session?.user?.image
  const existingImage = isExistingImage && awsURL + isExistingImage
  const form = useForm({
    resolver: zodResolver(formGeneralSchema),

    // defaultValues are used to prefill form.
    defaultValues: {
      // name: '',
    },
  })

  const onSubmit = (data) => {
    const URL = `${baseURL}vendor/general`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    if (!token) {
      console.error('FormGeneral() No token found')
      return
    }

    // Create a FormData object
    const formData = new FormData()
    const blob = convertBase64ToFile(image)
    formData.append('image', blob)
    formData.append('brand', data.brand)
    formData.append('link', data.link)
    formData.append('name', data.name)
    formData.append('brandDescription', data.brandDescription)
    formData.append('username', data.username)

    axios
      .patch(URL, formData, { headers: headers })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  // const [file, setFile] = useState(null)
  const [image, setImage] = useState(existingImage)
  return (
    <Card className="mx-auto max-w-screen-xl">
      <CardHeader>
        <CardTitle>General Info</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-6"
          >
            <ProfileImage image={image} setImage={setImage} />

            <FormTextInputs fields={fields} form={form} />

            <div className="flex">
              <Button type="submit" className="ml-44">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
