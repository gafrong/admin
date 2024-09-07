import { ChatSidebar } from './chat/ChatSidebar'
import { ChatHeader } from './chat/ChatHeader'
import { ChatMessages } from './chat/ChatMessages'
import { ChatInput } from './chat/ChatInput'

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
