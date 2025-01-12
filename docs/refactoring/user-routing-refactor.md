# User Routing Refactoring Plan

## Current Situation

We have a `protectRoute` higher-order component in `src/app/(auth)/_components/protect-route.js` that handles routing based on user authentication status. However, there's potential for improvement in how we manage and implement user routing across the application.

## Objectives

1. Centralize user routing logic
2. Improve maintainability and scalability of routing rules
3. Ensure consistency in routing behavior across the application

## Implementation Plan

1. Create a new utility file for user routing:

Create a new file `src/utils/userRouting.js` with the following content:

```javascript
const userRoutes = {
  isAdmin: '/dashboard',
  submitted: '/welcome',
  authenticated: '/onboarding',
  unauthenticated: '/',
  default: '/',
}

export function determineUserRoute(user, status) {
  const isUserUnauthenticated = status === 'unauthenticated'
  const isUserAuthenticated = status === 'authenticated'

  if (isUserUnauthenticated) return userRoutes.unauthenticated
  if (user.isAdmin) return userRoutes.isAdmin
  if (user.submitted) return userRoutes.submitted
  if (isUserAuthenticated) return userRoutes.authenticated

  return userRoutes.default
}

export function routeUser(user, status, router) {
  const route = determineUserRoute(user, status)
  console.log(`Routing user to: ${route}`)
  router.push(route)
}
```

2. Update `protect-route.js`:

Modify `src/app/(auth)/_components/protect-route.js` to use the new routing utility:

```javascript
import { routeUser } from '@/utils/userRouting'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function protectRoute(WrappedComponent, name = '') {
  return function ProtectedRoute(props) {
    const { data: session, status } = useSession()
    const user = session?.user
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return
      if (!user || !user.verified) {
        routeUser(user, status, router)
      }
    }, [user, status, router])

    return <WrappedComponent {...props} />
  }
}
```

## Benefits

- Centralizes routing logic in a single utility file
- Makes routing rules more declarative and easier to maintain
- Allows for easy expansion of user states and routes
- Improves consistency in routing behavior across the application

## Next Steps

1. Implement the changes as described in the implementation plan
2. Review and update any other components or pages that handle user routing to use the new `routeUser` function
3. Test thoroughly to ensure all routing scenarios work as expected
4. Implementing role-based access control
