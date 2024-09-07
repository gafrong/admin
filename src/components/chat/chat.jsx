import { ChatHeader } from './chat-header'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'
import { ChatSidebar } from './chat-sidebar'

export function Chat({ messages }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)]  w-full max-w-4xl">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        {/* <ChatHeader /> */}
        <ChatMessages messages={messages} />
        <ChatInput />
      </div>
    </div>
  )
}
