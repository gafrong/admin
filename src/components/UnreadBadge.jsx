'use client'

import { cn } from '@/lib/utils'

const BadgeCounter = ({ count = 0, color = 'yellow' }) => {
  if (count === 0) return null

  return (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full text-xs text-white',
        {
          'bg-yellow-500': color === 'yellow',
          'bg-red-500': color === 'red',
        },
      )}
    >
      {count}
    </div>
  )
}

export const UnreadBadge = ({ needsReplyCount = 0, unreadCount = 0 }) => {
  if (needsReplyCount === 0 && unreadCount === 0) return null

  return (
    <div className="flex flex-col gap-1">
      <BadgeCounter count={needsReplyCount} color="red" />
      <BadgeCounter count={unreadCount} color="yellow" />
    </div>
  )
}
