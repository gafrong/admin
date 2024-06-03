'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ProfileImage } from '@/components/typography/ProfileImage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { CardTitleDescription } from '../../_components/card-title-description'
import { convertBase64ToFile } from '../../_components/image'

function PendingDocument({ vendor }) {
  if (!vendor?.pending?.document) return null

  return (
    <div>
      <CardDescription className="pb-6">
        New document pending approval
      </CardDescription>
      <Image
        alt="document image"
        className="h-auto object-cover"
        height={144}
        src={`${awsURL}${vendor.pending.document}`}
        width={144}
      />
    </div>
  )
}

export function BusinessRegistrationDocument({
  form,
  isLoading,
  mutate,
  token,
  vendor,
}) {
  const [previewImage, setPreviewImage] = React.useState(null)
  const [isInitialImageLoaded, setIsInitialImageLoaded] = React.useState(false)

  // Second form submit handler
  const onSubmitDocument = async (data) => {
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
      mutate()
      setPreviewImage(awsURL + vendor.document)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Pre-fill image on page refresh
  React.useEffect(() => {
    if (vendor?.document && !isInitialImageLoaded) {
      setPreviewImage(awsURL + vendor.document)
      setIsInitialImageLoaded(true)
    }
  }, [vendor?.document, isInitialImageLoaded])

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
            <div>
              <CardDescription className="pb-6">
                Current document
              </CardDescription>
              <ProfileImage
                form={form}
                // type="docs"
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
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
