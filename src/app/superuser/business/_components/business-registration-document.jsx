'use client'

import { CardTitleDescription } from '@/app/settings/_components/card-title-description'
import { convertBase64ToFile } from '@/app/settings/_components/image'
import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import { ImageDocument } from '@/components/image-profile'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  ProfileImageUpload,
  srcDefaultImageDocs,
} from '@/components/typography/ProfileImageUpload'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import axios from 'axios'
import React from 'react'
import { DEBUG_PromotePendingDocument } from './debug'
import { ImageZoomDialog } from './image-zoom-dialog'

function PendingDocument({ vendor }) {
  const imageDoc = vendor?.pending?.document?.s3Key
  const isNonEmptyString = typeof imageDoc === 'string' && imageDoc.length > 0
  const imageSrc = isNonEmptyString ? `${awsURL}${imageDoc}` : null
  const isImageLoaded = typeof imageDoc === 'string'
  const img = isImageLoaded && isNonEmptyString ? imageSrc : srcDefaultImageDocs

  return (
    <div className="flex flex-col gap-6">
      <CardDescription>Document pending approval hub</CardDescription>
      <div className="relative h-36 w-36">
        <ImageDocument src={img} size={144} />
      </div>

      <ImageZoomDialog documentImage={imageSrc} altText={'altText'} />
      <DEBUG_PromotePendingDocument />
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
  const [previewImage, setPreviewImage] = React.useState(srcDefaultImageDocs)
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
              <ProfileImageUpload
                form={form}
                previewImage={previewImage}
                setPreviewImage={(image) => {
                  setPreviewImage(image)
                  setNewImageSelected(true)
                }}
                type={'docs'}
              />
              <ImageZoomDialog
                documentImage={previewImage}
                altText={'altText'}
              />
            </div>

            <PendingDocument vendor={vendor} />
          </div>
        </CardContent>

        <div></div>
      </form>
    </Card>
  )
}
