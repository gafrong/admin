import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSession } from 'next-auth/react'

function formatMessageTime(timestamp) {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now - messageDate) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  }
}

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
    <ScrollArea className="flex-1 p-4">
      {messages.map((message, index) => (
        <Message
          className="mb-4 last:mb-0"
          content={message.content}
          isOutgoing={message.sender.id === session?.user?._id}
          key={index}
          sender={message.sender.name}
          time={formatMessageTime(message.timestamp)}
        />
      ))}
    </ScrollArea>
  )
}

function Message({ sender, content, time, isOutgoing, className }) {
  return (
    <div className={`flex items-end gap-2 ${isOutgoing ? 'justify-end' : ''} ${className}`}>
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
