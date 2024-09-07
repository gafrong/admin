import { ChatSidebar } from './ChatSidebar'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'

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
