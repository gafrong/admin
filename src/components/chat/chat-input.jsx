// import { PaperclipIcon, SendIcon } from '@/components/Icons'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// export function ChatInput() {
//   return (
//     <div className="flex items-center gap-2 border-t p-3">
//       <Button variant="ghost" size="icon">
//         <PaperclipIcon className="h-5 w-5" />
//         <span className="sr-only">Attach file</span>
//       </Button>
//       <Input
//         type="text"
//         placeholder="Type your message..."
//         className="flex-1"
//       />
//       <Button variant="ghost" size="icon">
//         <SendIcon className="h-5 w-5" />
//         <span className="sr-only">Send message</span>
//       </Button>
//     </div>
//   )
// }
import { SendIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { addMessageToVendorSupportQuery } from '@/lib/api'

export function ChatInput({ queryId, onSendMessage, refetchQuery }) {

  console.log('ChatInput props:', { queryId, onSendMessage, refetchQuery })
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
          image: session?.user?.image
        },
        content: message.trim(),
        timestamp: new Date().toISOString(),
      }

      // Clear the input immediately
      setMessage('')

      try {
        if (queryId) {
          // Send message to API
          await addMessageToVendorSupportQuery(queryId, messageData, session?.token)
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
        // You might want to show an error message to the user here
      }

      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }
  }

  return (
    <div className="flex items-center gap-2 border-t p-4">
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
