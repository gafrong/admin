import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/user-avatar'
import { useEffect, useRef } from 'react'
import { formatChatMessageTime } from '../utils/chat-utils'

export function ChatMessages({ messages }) {
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  if (!messages || messages.length === 0) {
    return (
      <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
        <p className="text-center text-muted-foreground">No messages yet.</p>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
      <div className="space-y-4 py-4">
        {messages.map((message) => {
          if (!message.text || !message.userId) return null
          const isSuperAdminMessage = message.userId.role === 'superAdmin'
          return (
            <div
              key={message._id}
              className={`rounded-md border p-4 ${
                isSuperAdminMessage ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <UserAvatar
                  image={message.userId.image}
                  name={message.userId.name} // Default size, equivalent to 2rem / 32px
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.userId.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatChatMessageTime(message.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-base">{message.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
