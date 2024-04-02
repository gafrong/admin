import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function protectRoute(WrappedComponent, name = '') {
  return function ProtectedRoute(props) {
    // console.log(`ProtectedRoute(${name}):`, { props })
    const { data: session, status } = useSession()
    const user = session?.user
    const router = useRouter()

    useEffect(() => {
      const isUnauthenticated =
        (!user && status === 'unauthenticated') || !user?.verified
      if (isUnauthenticated) {
        setTimeout(() => {
          router.push('/')
        }, 200)
      }
    }, [session, router, status])

    return <WrappedComponent {...props} />
  }
}
