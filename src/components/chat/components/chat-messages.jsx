import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getInitials } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { formatChatMessageTime } from '../utils/chat-utils'
import { LoadingEllipsis } from './loading-ellipsis'

const TypingIndicator = ({ initialQuery, otherTypingUsers }) => {
  return (
    <>
      {otherTypingUsers.map((typingUser) => {
        const participant = initialQuery.participants.find(
          (p) => p.user?._id === typingUser.userId,
        )
        if (!participant) return null

        const image = participant?.user?.image

        return (
          <Message
            key={typingUser.userId}
            content={<LoadingEllipsis />}
            isOutgoing={false}
            sender={typingUser.name}
            time=""
            image={image}
          />
        )
      })}
    </>
  )
}

export function ChatMessages({
  messages,
  currentUserId,
  typingUsers,
  initialQuery,
}) {
  const scrollAreaRef = useRef(null)

  // Filter out the current user's userId from the typingUsers array
  const otherTypingUsers = typingUsers.filter(
    (user) => user.userId !== currentUserId,
  )

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, typingUsers])

  if (!messages || messages.length === 0) {
    return (
      <>
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <p className="text-center text-muted-foreground">No messages yet.</p>
        </ScrollArea>
      </>
    )
  }
  const formattedTime = (time) =>
    time ? formatChatMessageTime(time) : 'Just now'

  return (
    <ScrollArea className="flex-1 bg-muted px-4" ref={scrollAreaRef}>
      {messages.map((message, index) => {
        if (!message.content || !message.sender) {
          return null
        }

        const senderParticipant = initialQuery.participants.find(
          (p) => p.user?._id === message.sender?._id,
        )
        const senderImage = senderParticipant?.user?.image
        const isOutgoing = String(message.sender?._id) === String(currentUserId)

        return (
          <Message
            content={message.content}
            image={senderImage}
            isOutgoing={isOutgoing}
            key={message._id || index}
            sender={message.sender?.name || 'You'}
            time={formattedTime(message.timestamp)}
          />
        )
      })}
      <TypingIndicator
        initialQuery={initialQuery}
        otherTypingUsers={otherTypingUsers}
      />
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
        className={`mb-4 max-w-[65%] rounded-3xl border border-gray-300 p-3 px-5 text-sm shadow-sm ${
          isOutgoing ?
            'rounded-br-none bg-[#DCF7C5]'
          : 'rounded-bl-none bg-white '
        }`}
      >
        {content}
      </div>
      {content !== '...' && (
        <div className="text-xs text-muted-foreground">{time}</div>
      )}
    </div>
  )
}
