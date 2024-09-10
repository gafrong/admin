import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getInitials } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { formatChatMessageTime } from './chat-utils'

export function ChatMessages({ messages, currentUserId }) {
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
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <p className="text-center text-muted-foreground">No messages yet.</p>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      {messages.map((message, index) => {
        // Skip rendering if essential data is missing
        if (!message.content || !message.sender) {
          return null
        }

        const senderId = message.sender?._id
        const isOutgoing =
          senderId ? String(senderId) === String(currentUserId) : true

        return (
          <Message
            className="mb-4 last:mb-0"
            content={message.content}
            image={message.sender?.image}
            isOutgoing={isOutgoing}
            key={message._id || index}
            sender={message.sender?.name || 'You'}
            time={
              message.timestamp ?
                formatChatMessageTime(message.timestamp)
              : 'Just now'
            }
          />
        )
      })}
    </ScrollArea>
  )
}

function Message({ sender, content, image, time, isOutgoing, className }) {
  const imgSrc = image ? awsURL + image : IMG.defaultProfile

  return (
    <div
      className={`flex items-end gap-2 ${
        isOutgoing ? 'justify-end' : ''
      } ${className}`}
    >
      {!isOutgoing && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={imgSrc} alt={sender} />
          <AvatarFallback>{getInitials(sender)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[65%] rounded-lg p-3 text-sm ${
          isOutgoing ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}
      >
        {content}
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  )
}
