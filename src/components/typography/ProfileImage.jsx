import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FiCamera } from 'react-icons/fi'

const isValidImage = (file) => {
  const maxSize = 2 * 1024 * 1024 // 2MB in bytes
  return file && file.size < maxSize && file.type.includes('image')
}

const srcDefaultImage =
  'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png'

export const ProfileImage = ({
  image = srcDefaultImage,
  setImage,
  className = '',
}) => {
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (isValidImage(file)) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      console.error('Invalid image file')
    }
  }

  return (
    <div className={cn('flex', className)}>
      <div className="relative h-36 w-36 overflow-hidden rounded-full">
        <Image
          alt="profile image"
          fill
          priority={true}
          sizes="144px"
          src={image}
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
    </div>
  )
}
