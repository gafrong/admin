'use client'

const UnreadBadge = ({ count }) => {
  if (!count || count === 0) return null

  return (
    <div className="ml-2 inline-flex items-center justify-center">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
        {count}
      </div>
    </div>
  )
}

export default UnreadBadge
