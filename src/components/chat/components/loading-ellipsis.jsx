export function LoadingEllipsis() {
  return (
    <div className="flex h-4 items-center justify-center gap-1 bg-white text-gray-700 dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
    </div>
  )
}
