import { ProfileMini } from '@/app/superuser/users/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AiOutlineDelete } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function ChatHeader({ participant, queryId }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!session?.token || session.user.role !== 'superAdmin') {
      console.error('Unauthorized: Only superAdmin can delete support queries')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/v1/vendor-support-query/${queryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete query')
      }

      router.push('/messages/vendor-support-query')
    } catch (error) {
      console.error('Error deleting query:', error)
      // TODO: Show an error message to the user
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <div className="flex items-start justify-between border-b p-4">
      <div className="flex items-start gap-4">
        <ProfileMini user={participant} />
        <Badge variant="secondary">{participant.role || 'User'}</Badge>
      </div>
      {session?.user?.role === 'superAdmin' && (
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
