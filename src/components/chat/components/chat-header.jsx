import { deleteVendorSupportQuery } from '@/app/messages/vendor-support-query/api'
import { ProfileMini } from '@/app/superuser/users/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { isSuperAdmin } from '@/utils/user-utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

const UserProfile = ({ user }) => {
  return (
    <>
      <ProfileMini user={user} />
      <Badge variant="secondary">{user.role || 'User'}</Badge>
    </>
  )
}

export function ChatHeader({ participants, queryId, session }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!session?.token || !isSuperAdmin(session.user)) {
      console.error('Unauthorized: Only superAdmin can delete support queries')
      return
    }

    setIsDeleting(true)
    try {
      await deleteVendorSupportQuery(queryId, session.token)
      router.push('/messages/vendor-support-query')
    } catch (error) {
      console.error('Error deleting query:', error)
      // TODO: Show an error message to the user
    } finally {
      setIsDeleting(false)
    }
  }

  // Check if there is only one participant (the current user)
  const isOnlyCurrentUser =
    participants.length === 1 &&
    participants[0].user?._id === session?.user?._id

  const otherParticipant = participants.find(
    (p) => p.user?._id !== session?.user?._id,
  )

  return (
    <div className="flex items-start justify-between border-b p-4">
      {
        isOnlyCurrentUser ?
          // If there is only the current user, show no other user
          <></>
          // Otherwise, display the other participant's information
        : <div className="flex items-start gap-4">
            {otherParticipant?.user && (
              <UserProfile user={otherParticipant?.user} />
            )}
          </div>

      }
      {isSuperAdmin(session?.user) && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <AiOutlineDelete className="h-5 w-5" />
            <span className="sr-only">Delete vendor support query</span>
          </Button>
        </div>
      )}
    </div>
  )
}
