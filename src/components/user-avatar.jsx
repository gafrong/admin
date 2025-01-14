'use client'

import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getInitials } from '@/lib/utils'

export function UserAvatar({ image, name, size = 8, className }) {
  const initials = getInitials(name)
  const imageUrl = image ? `${awsURL}${image}` : IMG.defaultProfile

  return (
    <Avatar className={cn(`h-${size} w-${size}`, className)}>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
