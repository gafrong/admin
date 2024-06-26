'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { z } from 'zod'
import { FormMessage } from '../ui/form'

const MEGABYTES = 1024 * 1024
const maxSize = 10 * MEGABYTES
const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const imageFileSchema = z.object({
  file: z
    .unknown()
    .refine((file) => file && VALID_IMAGE_TYPES.includes(file.type), {
      message:
        'Invalid image file type. Please upload a PNG, JPEG, or JPG file.',
    })
    .refine((file) => file && file.size < maxSize, {
      message: 'Image too large. Please upload an image smaller than 2MB.',
    }),
})

const srcDefaultImageDocs =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/docs.jpg'

const srcDefaultImage =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png'

export const ProfileImage = ({
  className = '',
  form,
  type = 'profile', // new prop
  previewImage = srcDefaultImage,
  setPreviewImage,
}) => {
  const defaultImage =
    type === 'profile' ? srcDefaultImage : srcDefaultImageDocs
  const handleImageChange = (e) => {
    form.clearErrors('image')
    const file = e.target.files[0]
    const result = imageFileSchema.safeParse({ file })

    if (result.success) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof setPreviewImage === 'function') {
          setPreviewImage(reader.result) // Update the preview image immediately
        }
      }
      reader.readAsDataURL(file)
    } else {
      form.setError('image', {
        type: 'manual',
        message: result.error.errors[0].message,
      })
    }
  }

  const isImageLoaded = typeof previewImage === 'string'
  const imageStyle = type === 'profile' ? 'h-36 w-36 rounded-full' : 'h-36 w-36'
  return (
    <>
      <div className={cn('flex', className)}>
        <div className={`relative ${imageStyle}`}>
          <Image
            alt={`${type} image`}
            className="object-cover object-center"
            fill
            priority={true}
            sizes="144px"
            src={isImageLoaded ? previewImage : defaultImage}
          />
        </div>
        <label
          htmlFor="upload"
          className="absolute ml-[108px] cursor-pointer self-end rounded-full bg-slate-800 p-2 text-white"
        >
          <FiCamera />
          <input
            id="upload"
            type="file"
            name="image"
            className="hidden"
            accept="image/*, .png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {form.formState.errors.image && (
        <FormMessage>{form.formState.errors.image.message}</FormMessage>
      )}
    </>
  )
}
