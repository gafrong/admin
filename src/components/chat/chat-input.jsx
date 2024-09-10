import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addMessageToVendorSupportQuery } from '@/lib/api'
import { Paperclip as PaperclipIcon, Send as SendIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

export function ChatInput({ queryId, onSendMessage, refetchQuery }) {
  const [message, setMessage] = useState('')
  const { data: session } = useSession()
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSend = async () => {
    if (message.trim()) {
      const messageData = {
        sender: {
          _id: session?.user?.id,
          name: session?.user?.name,
          image: session?.user?.image,
        },
        content: message.trim(),
        timestamp: new Date().toISOString(),
      }

      // Clear the input immediately
      setMessage('')

      try {
        if (queryId) {
          // Send message to API
          await addMessageToVendorSupportQuery(
            queryId,
            messageData,
            session?.token,
          )
        }

        // Update UI immediately
        if (onSendMessage) {
          await onSendMessage(messageData)
        }

        // Refetch query after API call
        if (refetchQuery) {
          await refetchQuery()
        }
      } catch (error) {
        console.error('Error sending message:', error)
        // TODO: Show an error message to the user
      }

      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }
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
        placeholder="Type a message"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
      />
      <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  )
}
