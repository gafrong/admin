import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ChatMessages() {
  return (
    <ScrollArea className="flex-1 space-y-4 p-4">
      <Message
        sender="John Doe"
        content="Hey, how's it going? I wanted to check in and see if you had any updates on the project."
        time="3:45 PM"
        isOutgoing={false}
      />
      <Message
        content="The project is going well! I've made some good progress on the design and I'm ready to share an update with the team."
        time="3:47 PM"
        isOutgoing={true}
      />
      <Message
        sender="John Doe"
        content="Great, let's schedule a meeting to discuss the updates. I'm free this afternoon if that works for you."
        time="3:50 PM"
        isOutgoing={false}
      />
      <Message
        content="Sounds good, let's meet at 4pm. I'll send a calendar invite."
        time="3:51 PM"
        isOutgoing={true}
      />
    </ScrollArea>
  )
}

function Message({ sender, content, time, isOutgoing }) {
  return (
    <div className={`flex items-end gap-2 ${isOutgoing ? 'justify-end' : ''}`}>
      {!isOutgoing && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Image" />
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
