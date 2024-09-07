import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSession } from 'next-auth/react'

export function ChatMessages({ messages }) {
  const { data: session } = useSession()

  if (!messages || messages.length === 0) {
    return (
      <ScrollArea className="flex-1 p-4">
        <p className="text-center text-muted-foreground">No messages yet.</p>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="flex-1 space-y-4 p-4">
      {messages.map((message, index) => (
        <>
          <Message
            key={index}
            sender={message.sender.name}
            content={message.content}
            time={new Date(message.timestamp).toLocaleTimeString()}
            isOutgoing={message.sender.id === session?.user?._id}
          />
        </>
      ))}
    </ScrollArea>
  )
}

function Message({ sender, content, time, isOutgoing }) {
  return (
    <div className={`flex items-end gap-2 ${isOutgoing ? 'justify-end' : ''}`}>
      {!isOutgoing && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src="/placeholder-user.jpg" alt={sender} />
          <AvatarFallback>
            {sender
              ?.split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
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
