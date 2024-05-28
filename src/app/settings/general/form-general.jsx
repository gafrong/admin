'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner, {
  LoadingSpinnerButton,
} from '@/components/LoadingSpinner'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormTextInputs } from '../_components/form-text-inputs'

export const formGeneralSchema = z.object({
  name: z.string(),
  username: z.string(),
  brandDescription: z.string(),
  link: z.string().optional(),
  brand: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
})

const fields = [
  {
    autocomplete: 'nope',
    label: 'Name*',
    name: 'name',
    type: 'text',
    // placeholder: 'John Doe',
  },
  {
    autocomplete: 'username',
    label: 'Username*',
    name: 'username',
    type: 'text',
    // placeholder: 'JohnDoe',
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
  {
    label: 'Email*',
    name: 'email',
    type: 'email',
  },
  {
    autocomplete: 'new-password',
    label: 'Password',
    name: 'password',
    type: 'password',
  },
  {
    label: 'Confirm Password*',
    name: 'confirmPassword',
    type: 'password',
  },
]

const convertBase64ToFile = (imageBase64) => {
  // Convert image base64 string to a Blob
  // a blob is the same as a file, which is what the backend expects.
  // the base64 image is needed for previewing the image in the browser.

  const isBase64 = /^data:image\/[a-zA-Z+]*;base64,/.test(imageBase64)
  if (!isBase64) {
    console.error('convertBase64ToFile(): Invalid base64 string')
    return false
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

const fallbackImage =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png'

export function FormGeneral() {
  const { data: session, update, status } = useSession()
  const { token, user } = session || {}
  const [previewImage, setPreviewImage] = React.useState(fallbackImage) // New state for the preview image
  let isInitialImageLoaded

  React.useEffect(() => {
    if (session?.user?.image && !isInitialImageLoaded) {
      setPreviewImage(awsURL + user?.image)
      isInitialImageLoaded = true
    }
  }, [session])

  const form = useForm({
    resolver: zodResolver(formGeneralSchema),
    defaultValues: {
      name: '',
      username: '',
      brandDescription: '',
      link: '',
      brand: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Pre-fill form data on page refresh
  React.useEffect(() => {
    if (!user) {
      console.log('No user found')
      return
    } else {
      console.log('Found user')
    }
    form.reset({
      name: user?.name || '',
      username: user?.username || '',
      brandDescription: user?.brandDescription || '',
      link: user?.link && user?.link !== 'undefined' ? user?.link : '',
      brand: user?.brand || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    })
  }, [user, form])

  const onSubmit = async (data) => {
    // Validate the data
    const { username } = data
    if (validatePasswordEntered({ data, form })) {
      form.setError('confirmPassword', errorMessages.password)
      return
    }
    const isValidUsername = await validateUsername({
      username,
      token,
      user,
    })
    if (!isValidUsername) {
      form.setError('username', errorMessages.username)
      return
    }
    if (!token) {
      console.error('FormGeneral() No token found')
      return
    }

    const URL_ENDPOINT = `${baseURL}vendor/profile-form/general`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const image = convertBase64ToFile(previewImage)
    const formData = new FormData()
    image && formData.append('image', image)
    formData.append('brand', data.brand)
    formData.append('link', data.link)
    formData.append('name', data.name)
    formData.append('brandDescription', data.brandDescription)
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)

    axios
      .patch(URL_ENDPOINT, formData, { headers: headers })
      .then(async (response) => {
        const updatedUser = response.data?.user
        if (image) {
          setPreviewImage(URL.createObjectURL(image))
        }
        await update({
          user: {
            ...user,
            image: updatedUser?.image,
            name: updatedUser?.name,
            username: updatedUser?.username,
            brandDescription: updatedUser?.brandDescription,
            link: validateLink(updatedUser) ? updatedUser?.link : '',
            brand: updatedUser?.brand,
          },
        })
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    // add a delay to show spinner until the image is uploaded to s3
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <Card className="relative mx-auto max-w-screen-xl p-6">
      {(status === 'loading' || form.formState.isSubmitting) && (
        <LoadingSpinner className="absolute inset-0 flex h-full items-center justify-center bg-black bg-opacity-5" />
      )}
      <CardHeader>
        <CardTitle>General Info</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form
            className="mt-6 flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ProfileImage
              form={form}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
            />

            <FormTextInputs fields={fields} form={form} />

            <div>
              <Button type="submit" className="ml-44">
                Save
                {form.formState.isSubmitting ?
                  <LoadingSpinnerButton color="#fff" />
                : null}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function validateLink(updatedUser) {
  return updatedUser?.link && updatedUser?.link !== 'undefined'
}

function validatePasswordEntered({ data, form }) {
  data.password !== data.confirmPassword &&
    form.formState.dirtyFields.password &&
    data.password.trim().length < 6
}

function validateUsername({ username, token, user }) {
  return new Promise((resolve, reject) => {
    const URL_USERNAME = `${baseURL}vendor/validate-username/${username}`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const body = {
      userId: user._id, // assuming user._id contains the current user's ID
    }
    if (!token) {
      console.error('validateUsername() No token found')
      reject('No token found')
      return
    }

    axios
      .post(URL_USERNAME, body, { headers })
      .then((response) => {
        const isValid = Boolean(response.data?.valid)
        resolve(isValid)
      })
      .catch((error) => {
        console.error('Validate Username Error:', error)
        reject(error)
      })
  })
}

const errorMessages = {
  password: {
    type: 'manual',
    message: 'Passwords do not match.',
  },
  username: {
    type: 'manual',
    message: 'Username is already taken.',
  },
}
