import { addMessage } from '@/app/messages/superadmin-questions/api'
import { ButtonLoader } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Paperclip } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

export const ChatInput = ({ questionId, user, onMessageSent }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isSending) {
      setIsSending(true)
      try {
        await addMessage(questionId, inputMessage.trim(), user?.id)
        setInputMessage('')
        onMessageSent()
      } catch (error) {
        console.error('Error sending message:', error)
      } finally {
        setIsSending(false)
      }
    }
  }

  const handleReturnKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="m-4 mb-16 flex flex-col gap-4 rounded border p-4">
      <div className="flex justify-end gap-2">
        <Label htmlFor="messageInput" className="mr-auto">
          Reply
        </Label>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          // TODO: Implement screenshot upload functionality
          disabled
          title="Upload Screenshot"
        >
          <Paperclip className="h-5 w-5" />
          <span className="sr-only">Upload Screenshot</span>
        </Button>
        <ButtonLoader
          disabled={!inputMessage.trim() || isSending}
          isLoading={isSending}
          onClick={handleSendMessage}
        >
          Send
        </ButtonLoader>
      </div>
      <Textarea
        id="messageInput"
        ref={textareaRef}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleReturnKey}
        placeholder="Type your message..."
        className="flex-1"
      />
    </div>
  )
}
