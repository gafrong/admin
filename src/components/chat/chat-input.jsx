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
import { useState } from 'react'
import { PaperPlaneIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="flex items-center gap-2 border-t p-4">
      <Textarea
        className="flex-1"
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
      <Button size="icon" onClick={handleSend}>
        <PaperPlaneIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  )
}
