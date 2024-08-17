'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ProfileImage } from '@/components/typography/ProfileImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { CardTitleDescription } from '../../_components/card-title-description'
import { convertBase64ToFile } from '../../_components/image'
import { ImageZoomDialog } from './image-zoom-dialog'

function PendingDocument({ vendor }) {
  if (!vendor?.pending?.document?.s3Key) return null
  const imageSrc = `${awsURL}${vendor.pending.document.s3Key}`
  return (
    <div className="flex flex-col gap-6">
      <CardDescription>Document pending approval</CardDescription>
      <Image
        alt="document image"
        className="h-36 w-36 object-cover object-center"
        height={144}
        src={imageSrc}
        width={144}
      />
      <ImageZoomDialog documentImage={imageSrc} altText={'altText'} />
    </div>
  )
}

export function BusinessRegistrationDocument({
  form,
  isLoading,
  refetchVendor,
  token,
  vendor,
}) {
  const [previewImage, setPreviewImage] = React.useState(null)
  const [newImageSelected, setNewImageSelected] = React.useState(false)

  React.useEffect(() => {
    if (vendor?.document?.s3Key) {
      setPreviewImage(awsURL + vendor.document.s3Key)
    }
  }, [vendor?.document?.s3Key])

  // Second form submit handler
  const onSubmitDocument = async (data) => {
    if (!newImageSelected) {
      console.error('No new document selected')
      return
    }
    const URL_ENDPOINT = `${baseURL}vendor/profile-form/registration-document`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const image = convertBase64ToFile(previewImage)
    const formData = new FormData()
    image && formData.append('document', image)
    try {
      const response = await axios.patch(URL_ENDPOINT, formData, { headers })

      if (response.status !== 200) {
        throw new Error('Error updating vendor')
      }

      const updatedVendor = await refetchVendor()
      setPreviewImage(awsURL + updatedVendor.document.s3Key)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Card className="relative mx-auto mt-10 max-w-screen-xl p-6 pt-0">
      <form onSubmit={form.handleSubmit(onSubmitDocument)}>
        {isLoading && (
          <LoadingSpinner className="absolute inset-0 flex h-full items-center justify-center bg-black bg-opacity-5" />
        )}

        <CardTitleDescription
          title="Business Registration"
          description="Request Business Registration Change"
        />
        <CardContent className="my-6">
          <div className="flex gap-12">
            <div className="flex flex-col gap-6">
              <CardDescription>Current document</CardDescription>
              <ProfileImage
                form={form}
                // type="docs"
                previewImage={previewImage}
                setPreviewImage={(image) => {
                  setPreviewImage(image)
                  setNewImageSelected(true)
                }}
              />
              <ImageZoomDialog
                documentImage={previewImage}
                altText={'altText'}
              />
            </div>

            <PendingDocument vendor={vendor} />
          </div>
        </CardContent>

        <div>
          <Button type="submit" className="ml-6">
            Save
          </Button>
        </div>
      </form>
    </Card>
  )
}
