import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { ChatHeader } from './chat-header'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'

export function Chat({ initialQuery, queryId, refetchQuery }) {
  const { data: session } = useSession()
  const [query, setQuery] = useState(initialQuery)
  const [messages, setMessages] = useState(initialQuery.messages || [])
  const [participants, setParticipants] = useState(
    initialQuery.participants || [],
  )

  useEffect(() => {
    // TODO: set up any real-time subscriptions using WebSockets
  }, [])

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage])
    // Do not send the message to backend.
    // The refreshQuery function will be called instead.
  }

  const otherParticipant =
    participants.find((p) => p._id !== session?.user?._id) || {}

  return (
    <div className="mx-auto flex h-[calc(100vh-80px)] w-full">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        <ChatHeader participant={otherParticipant} queryId={queryId} />
        <ChatMessages messages={messages} currentUserId={session?.user?._id} />
        <ChatInput
          onSendMessage={addMessage}
          queryId={queryId}
          refetchQuery={refetchQuery}
        />
      </div>
    </div>
  )
}
