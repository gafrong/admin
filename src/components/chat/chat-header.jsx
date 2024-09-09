import { ProfileMini } from '@/app/superuser/users/page'
import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AiOutlineDelete } from 'react-icons/ai'

export const getInitials = (name) =>
  name ?
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
  : ''

export function ChatHeader({ participant }) {
  return (
    <div className="flex items-start justify-between border-b p-4">
      <div className="flex items-start gap-4">
        <ProfileMini user={participant} />
        <Badge variant="secondary">{participant.role || 'User'}</Badge>
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <AiOutlineDelete className="h-5 w-5" />
          <span className="sr-only">Delete vendor support query</span>
        </Button>
      </div>
    </div>
  )
}
