'use client'

import React from 'react'
import { ChatHeader } from './components/chat-header'
import { ChatInput } from './components/chat-input'
import { ChatMessages } from './components/chat-messages'
import { ChatSidebar } from './components/chat-sidebar'

export function Chat({ initialQuery, refetchQuery, session }) {
  const { messages, _id: queryId, participants } = initialQuery
  const { user = {} } = session || {}
  const userId = user?._id

  return (
    <div className="mx-auto flex h-[calc(100vh-80px)] w-full">
      <ChatSidebar user={user} />
      <div className="flex flex-1 flex-col">
        <ChatHeader
          participants={participants}
          queryId={queryId}
          session={session}
        />
        <ChatMessages
          currentUserId={userId}
          messages={messages}
          initialQuery={initialQuery}
        />
        <ChatInput refetchQuery={refetchQuery} roomId={queryId} user={user} />
      </div>
    </div>
  )
}
