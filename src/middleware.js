import { auth } from '@/auth'
import { hasAdminLevel, hasSuperAdminRole } from '@/utils/user-utils'
import { NextResponse } from 'next/server'

// Route constants for better maintainability
const ROUTES = {
  DASHBOARD: '/dashboard',
  WELCOME: '/welcome',
  ONBOARDING: '/onboarding',
  LOGIN: '/',
  ROOT: '/',
  PARTNER_REGISTER: '/partner-register',
  RESET_PASSWORD: '/reset-password',
}

const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.ROOT,
  ROUTES.PARTNER_REGISTER,
  ROUTES.RESET_PASSWORD,
]

// Routes that require admin or superadmin role
const ADMIN_ROUTES = [
  '/clients', // Covers /clients/search
  '/dashboard',
  '/messages',
  '/orders', // Covers /orders/manage
  '/settings', // Covers all settings routes
  '/statistics', // Covers /statistics/daily and /statistics/weekly
  '/videos', // Covers /videos/videoadd and /videos/videomanage
]

// Routes that require superadmin role only
const SUPERADMIN_ROUTES = [
  '/superuser', // TODO: Consider renaming to /superadmin for consistency
]

// Get the appropriate route based on user state
const getUserRoute = (user) => {
  if (!user) return ROUTES.LOGIN

  // Admin (submitted=true) /Superadmin -> Dashboard
  if (hasAdminLevel(user)) return ROUTES.DASHBOARD

  // Pending admin (submitted=true) -> Welcome
  if (user.submitted) return ROUTES.WELCOME

  // New admin (submitted=false) -> Onboarding
  return ROUTES.ONBOARDING
}

// Check if user has access to a specific route
const hasRouteAccess = (user, pathname) => {
  // Public routes are always accessible
  if (PUBLIC_ROUTES.includes(pathname)) return true

  // All other routes require authentication
  if (!user) return false

  // Check superadmin routes first
  const isSuperadminRoute = SUPERADMIN_ROUTES.some((route) =>
    pathname.startsWith(route),
  )
  if (isSuperadminRoute) return hasSuperAdminRole(user)

  // Check admin routes
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  if (isAdminRoute) return hasAdminLevel(user)

  // Welcome page - for users who submitted documents
  if (pathname === ROUTES.WELCOME) return user.submitted

  // Onboarding - for authenticated users who haven't submitted
  if (pathname === ROUTES.ONBOARDING) return !user.submitted

  // Default - allow access to authenticated users
  return true
}

const hasTokenExpired = (token) => {
  if (!token) return true

  try {
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = tokenData.exp * 1000 // Convert to milliseconds
    return Date.now() >= expirationTime
  } catch (error) {
    console.error('Error checking token expiration:', error)
    return true
  }
}

export default auth((req) => {
  const user = req.auth?.user
  const token = req.auth?.token
  const pathname = req.nextUrl.pathname

  // Allow public routes even with expired token
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Check token expiration for protected routes
  if (hasTokenExpired(token)) {
    console.log('Token expired, redirecting to login')
    const response = NextResponse.redirect(new URL(ROUTES.LOGIN, req.url))

    // Clear the auth cookie to ensure proper logout
    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('__Secure-next-auth.session-token')

    return response
  }

  // If user doesn't have access to current route, redirect to appropriate route
  if (!hasRouteAccess(user, pathname)) {
    const redirectUrl = getUserRoute(user)
    console.log('No access, redirecting to:', redirectUrl)
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  console.log('No redirect needed, proceeding to:', pathname)
  return NextResponse.next()
})

// Configure which routes middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /.* (static files)
     */
    '/((?!api|_next|.*\\.|next-env.*).*)',
  ],
}
