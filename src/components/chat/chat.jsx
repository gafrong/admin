'use client'

import { ChatInput } from './components/chat-input'
import { ChatMessages } from './components/chat-messages'
import { QuestionHeader } from './components/question-header'

export function Chat({ superadminQuestion, onMessageSent, session }) {
  const { answers, _id } = superadminQuestion
  const { user = {} } = session || {}

  return (
    <div className="h-[calc(100vh-80px)] w-full">
      <div className="flex flex-1 flex-col gap-4">
        <QuestionHeader
          superadminQuestion={superadminQuestion}
          session={session}
        />
        <ChatMessages messages={answers} />
        <ChatInput questionId={_id} user={user} onMessageSent={onMessageSent} />
      </div>
    </div>
  )
}
