import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { AiOutlineDelete } from "react-icons/ai"
export function ChatHeader({ participant }) {
  const imgSrc = participant.image ? awsURL + participant.image : IMG.profile
  const initials = participant.name
    ? participant.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : ''

  return (
    <div className="flex items-center gap-3 border-b p-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={imgSrc} alt={participant.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{participant.name}</div>
        <div className="text-xs text-muted-foreground">{participant.role || 'User'}</div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <AiOutlineDelete className="h-5 w-5" />
          <span className="sr-only">Delete vendor support query</span>
        </Button>
      </div>
    </div>
  )
}
