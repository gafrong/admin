'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner, {
  LoadingSpinnerButton,
} from '@/components/LoadingSpinner'
import { ProfileImageUpload } from '@/components/typography/ProfileImageUpload'
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
import { convertBase64ToFile } from '../_components/image'

export const formGeneralSchema = z.object({
  brand: z.string(),
  brandDescription: z.string(),
  confirmPassword: z.string().optional(),
  email: z.string().email(),
  link: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  username: z.string(),
})

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

const fields = [
  {
    // autocomplete: 'nope',
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
    autocomplete: 'new-password',

    label: 'Confirm Password*',
    name: 'confirmPassword',
    type: 'password',
  },
]

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
      brand: '',
      brandDescription: '',
      confirmPassword: '',
      email: '',
      link: '',
      name: '',
      password: '',
      username: '',
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
      brand: user?.brand || '',
      brandDescription: user?.brandDescription || '',
      confirmPassword: '',
      email: user?.email || '',
      link: user?.link && user?.link !== 'undefined' ? user?.link : '',
      name: user?.name || '',
      password: '',
      username: user?.username || '',
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
      token,
      user,
      username,
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
    formData.append('brandDescription', data.brandDescription)
    formData.append('email', data.email)
    formData.append('link', data.link)
    formData.append('name', data.name)
    formData.append('password', data.password)
    formData.append('username', data.username)

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
            <ProfileImageUpload
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
