import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { cn } from '@/lib/utils'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'
import { ImageProfile } from '../image-profile'
import Image from 'next/image'

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
// end shadcn ui/

const getInitials = (name) =>
  name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : ''

    // version 1: component using shadcn ui Avatar
const ProfileImage1 = ({ participant }) => {
  const initials = getInitials(participant.name)
    ? participant.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : ''
  return (
    <Avatar className="h-10 w-10 border">
      <AvatarImage src={imgSrc} alt={participant.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}


// end version 1: 


// profile Image
// -------------
export const ImageProfile = ({
  alt = 'profile',
  className = '',
  size,
  src,
}) => (
  <div
    className={`overflow-hidden rounded-full border ${className}`}
    style={{ width: size, height: size }}
  >
    <Image
      alt={alt}
      height={size}
      src={src} // Access nested object value
      width={size}
    />
  </div>
)

// import Image from 'next/image'

    // version 2

export const ProfileMini = ({ user }) => {
    if (!user) return null
    const isImage = user.image && user.image.trim() !== ''
    const imageUrl = isImage ? `${awsURL}${user.image}` : IMG.profile
  
    return (
      <div className="flex gap-4">
        <ImageProfile size={48} src={imageUrl} />
        <div className="mr-4">
          <p>{user.name}</p>
          <p className="mt-1 text-xs text-gray-500">@{user.username}</p>
        </div>
      </div>
    )
  }