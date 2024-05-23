'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { z } from 'zod'
import { ToastDestructive } from '../ui/toast-destructive'

const MB = 1024 * 1024
const maxSize = 5 * MB
const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const imageFileSchema = z.object({
  file: z
    .unknown()
    .refine((file) => file && VALID_IMAGE_TYPES.includes(file.type), {
      message:
        'Invalid image file type. Please upload a PNG, JPEG, or JPG file.',
    })
    .refine((file) => file && file.size < maxSize, {
      message: 'Image too large. Please upload an image smaller than 5MB.',
    }),
})

const srcDefaultImage =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png'

export const ProfileImage = ({
  className = '',
  previewImage = srcDefaultImage,
  setPreviewImage,
}) => {
  const [imageError, setImageError] = React.useState(null)

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    const result = imageFileSchema.safeParse({ file })

    if (result.success) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result) // Update the preview image immediately
      }
      reader.readAsDataURL(file)
    } else {
      setImageError(result.error.errors[0].message)
      console.error('handleProfileImageChange(): Invalid image file')

      setTimeout(() => {
        setImageError(null)
      }, 5000)
    }
  }
  // clear up a temporary network error when the FilerReader is used
  const isImageLoaded = typeof previewImage === 'string'
  return (
    <div className={cn('flex', className)}>
      <div className="relative h-36 w-36 overflow-hidden rounded-full">
        <Image
          alt="profile image"
          className="object-cover object-center"
          fill
          priority={true}
          sizes="144px"
          src={isImageLoaded ? previewImage : ''}
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
          onChange={handleProfileImageChange}
        />
      </label>
      {imageError && (
        <ToastDestructive
          title="Image file upload error"
          message={imageError}
          // actionMsg="Try again"
        />
      )}
    </div>
  )
}
