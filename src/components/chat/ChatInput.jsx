import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaperclipIcon, SendIcon } from '@/components/Icons'

export function ChatInput() {
  return (
    <div className="flex items-center gap-2 border-t p-3">
      <Button variant="ghost" size="icon">
        <PaperclipIcon className="h-5 w-5" />
        <span className="sr-only">Attach file</span>
      </Button>
      <Input
        type="text"
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button variant="ghost" size="icon">
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  )
}
