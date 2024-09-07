import { MoveHorizontalIcon, PhoneIcon, VideoIcon } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function ChatHeader() {
  return (
    <div className="flex items-center gap-3 border-b p-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src="/placeholder-user.jpg" alt="Image" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">John Doe</div>
        <div className="text-xs text-muted-foreground">Online</div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <PhoneIcon className="h-5 w-5" />
          <span className="sr-only">Call</span>
        </Button>
        <Button variant="ghost" size="icon">
          <VideoIcon className="h-5 w-5" />
          <span className="sr-only">Video call</span>
        </Button>
        <Button variant="ghost" size="icon">
          <MoveHorizontalIcon className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </div>
    </div>
  )
}
