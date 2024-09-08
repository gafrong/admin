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
    // Here you would set up any real-time listeners or subscriptions
    // For example, using WebSockets or GraphQL subscriptions
  }, [])

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage])
    // Here you would also send the message to your backend
  }

  const otherParticipant =
    participants.find((p) => p._id !== session?.user?._id) || {}

  return (
    <div className="mx-auto flex h-[calc(100vh-80px)] w-full max-w-4xl">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        <ChatHeader participant={otherParticipant} />
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
