import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetSession } from '../orders/manage/use-fetch-auth'

export function protectRoute(WrappedComponent, name = '') {
  return function ProtectedRoute(props) {
    // console.log(`ProtectedRoute(${name}):`, { props })
    const { user, status } = useGetSession()
    const router = useRouter()

    useEffect(() => {
      const isUnauthenticated = !user && status === 'unauthenticated'
      if (isUnauthenticated) {
        setTimeout(() => {
          router.push('/')
        }, 200)
      }
    }, [user, router, status])

    return <WrappedComponent {...props} />
  }
}
