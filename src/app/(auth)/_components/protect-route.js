import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function protectRoute(WrappedComponent, name = '') {
  return function ProtectedRoute(props) {
    // name is for debugging.
    // console.log(`ProtectedRoute(${name})`)
    const { data: session, status } = useSession()
    const user = session?.user
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return
      const isUnauthenticated = status === 'unauthenticated'
      // if (isUnauthenticated) return
      const isUnauthenticatedOrNotVerified =
        (!user && isUnauthenticated) || !user?.verified
      if (isUnauthenticatedOrNotVerified) {
        setTimeout(() => {
          console.log(`Redirecting to root`)
          router.push('/')
        }, 200)
      }
    }, [session, router, status])

    return <WrappedComponent {...props} />
  }
}
