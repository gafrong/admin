import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Paperclip as PaperclipIcon,
  RefreshCcw,
  Send as SendIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const ChatInput = ({ roomId, user, socket, refetchQuery }) => {
  const [inputMessage, setInputMessage] = useState('')
  const textareaRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSendMessage = () => {
    console.log('handleSendMessage():')
    if (inputMessage.trim() && socket && user) {
      const messageData = {
        queryId: roomId, // Assuming you have access to the roomId prop
        content: inputMessage.trim(),
        sender: {
          _id: user._id,
          name: user.name,
          image: user.image,
        },
        timestamp: new Date().toISOString(),
      }

      // Emit the message to the server
      socket.emit('client:chatMessage', messageData)
      setInputMessage('')
    }
  }

  const handleReturnKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleTypingIndicator = (e) => {
    const isUserTyping = e.target.value.trim().length > 0
    setIsTyping(isUserTyping)
    if (!user) return

    if (isUserTyping) {
      socket.emit('client:typing', { queryId: roomId, userId: user._id })
    }

    if (!isUserTyping) {
      socket.emit('client:stopTyping', { userId: user._id })
    }
  }

  const doubleRefetch = async () => {
    console.log('doubleRefetch...')
    await refetchQuery()
    refetchQuery()
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
        onChange={(e) => {
          setInputMessage(e.target.value)
          handleTypingIndicator(e)
        }}
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
      <Button size="icon" onClick={doubleRefetch}>
        <RefreshCcw className="h-5 w-5" />
        <span className="sr-only">Refresh</span>
      </Button>
    </div>
  )
}
