'use client'

import { useVendorSupportQueries } from '@/app/messages/vendor-support-query/api'
import { isSuperAdmin } from '@/utils/user-utils'
import React from 'react'
import { ChatHeader } from './components/chat-header'
import { ChatInput } from './components/chat-input'
import { ChatMessages } from './components/chat-messages'
import { ChatSidebar } from './components/chat-sidebar'

export function Chat({ initialQuery, refetchQuery, session }) {
  const { messages, _id: queryId, participants } = initialQuery
  const { user = {} } = session || {}
  const userId = user?._id
  const { mutate: refetchQueries } = useVendorSupportQueries(isSuperAdmin(user))

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
        <ChatInput
          roomId={queryId}
          user={user}
          refetchQueries={refetchQueries}
        />
      </div>
    </div>
  )
}
