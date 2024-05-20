'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import { LoadingSpinnerButton } from '@/components/LoadingSpinner'
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
import { usePersistedStore } from '@/store/persisted-store'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import * as React from 'react'
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
const getImage = (currentImage) => {
  const imageUrl =
    currentImage.startsWith('http') ? currentImage : awsURL + currentImage
  return imageUrl
}
const convertBase64ToFile = (imageBase64) => {
  // Convert image base64 string to a Blob
  // a blob is the same as a file, which is what the backend expects.
  // the base64 image is needed for previewing the image in the browser.

  const isBase64 = /^data:image\/[a-zA-Z+]*;base64,/.test(imageBase64)
  if (!isBase64) {
    console.error('convertBase64ToFile(): Invalid base64 string')
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

const fallbackImage =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png'

export function FormGeneral() {
  console.log('FormGeneral()')
  const { data: session } = useSession()
  const { token, user } = session || {}
  const imageUrl = usePersistedStore((state) => state.imageUrl)
  const setImageUrl = usePersistedStore((state) => state.setImageUrl)
  const [previewImage, setPreviewImage] = React.useState(fallbackImage) // New state for the preview image
  let imageInitialised

  React.useEffect(() => {
    const currentImage = session?.user?.image
    if (currentImage) {
      !imageInitialised && setPreviewImage(getImage(currentImage))
      imageInitialised = true
      console.log('1. updated previewImage:', { previewImage })
    }
  }, [session])

  const form = useForm({
    resolver: zodResolver(formGeneralSchema),
    // defaultValues are used to prefill form.
    defaultValues: {
      name: user?.name || '',
      username: user?.username || '',
      brandDescription: user?.brandDescription || '',
      link: (user?.link && user?.link !== 'undefined') || '',
      brand: user?.brand || '',
    },
  })

  const onSubmit = async (data) => {
    console.log('onSubmit:')

    const URL = `${baseURL}vendor/general`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    if (!token) {
      console.error('FormGeneral() No token found')
      return
    }

    const formData = new FormData()
    const image = convertBase64ToFile(previewImage)
    formData.append('image', image)
    console.log('image::', image)
    formData.append('brand', data.brand)
    formData.append('link', data.link)
    formData.append('name', data.name)
    formData.append('brandDescription', data.brandDescription)
    formData.append('username', data.username)
    axios
      .patch(URL, formData, { headers: headers })
      .then(async (response) => {
        const image = response.data?.user?.image
        console.log('session image:', { image })
        setImageUrl(awsURL + image)
        setPreviewImage(awsURL + image)
        session.user.image = image
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    // add a delay to show spinner until the image is updloaded to s3
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
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
              <ProfileImage
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
      <h1 className="bold text-xl">imageUrl: </h1>
      <div className="text-sm">{imageUrl}</div>

      <br></br>

      <h1 className="bold text-xl">session image: </h1>
      <div className="text-sm">{session?.user?.image}</div>

      <br></br>

      <h1 className="bold text-xl">previewImage: </h1>
      <div className="text-sm">
        {JSON.stringify(previewImage).substring(0, 100)}
      </div>
      {/* <Debug
        imageUrl={imageUrl}
        previewImage={previewImage}
        session={session}
      /> */}
    </>
  )
}

function Debug({ imageUrl, session, previewImage }) {
  return (
    <div>
      <h1 className="bold text-xl">imageUrl: </h1>
      <div className="text-sm">{imageUrl}</div>

      <br></br>

      <h1 className="bold text-xl">session image: </h1>
      <div className="text-sm">{session?.user?.image}</div>

      <br></br>

      <h1 className="bold text-xl">previewImage: </h1>
      <div className="text-sm">
        {JSON.stringify(previewImage).substring(0, 100)}
      </div>
    </div>
  )
}
