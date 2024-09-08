import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef } from 'react'

function formatMessageTime(timestamp) {
  const messageDate = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now - messageDate) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (diffInHours < 48) {
    return 'Yesterday'
  } else {
    return messageDate.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
}

export function ChatMessages({ messages, currentUserId }) {
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

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
          return null;
        }

        return (
          <Message
            className="mb-4 last:mb-0"
            content={message.content}
            image={message.sender?.image}
            isOutgoing={message.sender?._id === currentUserId}
            key={message._id || index}
            sender={message.sender?.name || 'Unknown'}
            time={message.timestamp ? formatMessageTime(message.timestamp) : 'Just now'}
          />
        );
      })}
    </ScrollArea>
  )
}

const getInitials = (name) =>
  name
    ?.split(' ')
    .map((n) => n[0])
    .join('')

function Message({ sender, content, image, time, isOutgoing, className }) {
  const imgSrc = image ? awsURL + image : IMG.profile

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
