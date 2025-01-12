import { sendMessage } from '@/app/messages/vendor-support-query/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Paperclip as PaperclipIcon,
  RefreshCcw,
  Send as SendIcon,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

export const ChatInput = ({ roomId, user, refetchQuery }) => {
  const [inputMessage, setInputMessage] = useState('')
  const textareaRef = useRef(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSendMessage = async () => {
    if (inputMessage.trim() && user) {
      const messageData = {
        queryId: roomId,
        content: inputMessage.trim(),
        sender: {
          _id: user._id,
          name: user.name,
          image: user.image,
        },
        timestamp: new Date().toISOString(),
      }

      await sendMessage(messageData, session?.token)
      setInputMessage('')
      refetchQuery()
    }
  }

  const handleReturnKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const refreshMessages = async () => {
    await refetchQuery()
  }

  return (
    <div className="flex items-center gap-2 border-t p-4">
      <Button variant="outline" size="icon">
        <PaperclipIcon className="h-5 w-5" />
        <span className="sr-only">Attach file</span>
      </Button>
      <Textarea
        ref={textareaRef}
        className="min-h-[40px] flex-1"
        placeholder="Type a message..."
        rows={1}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleReturnKey}
      />

      <Button
        size="icon"
        onClick={handleSendMessage}
        disabled={!inputMessage.trim() || !user}
      >
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>

      <Button size="icon" onClick={refreshMessages}>
        <RefreshCcw className="h-5 w-5" />
        <span className="sr-only">Refresh</span>
      </Button>
    </div>
  )
}
