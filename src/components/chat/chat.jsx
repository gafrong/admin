import { ChatHeader } from './chat-header'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'
import { ChatSidebar } from './chat-sidebar'

export function Chat() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-4xl">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}
