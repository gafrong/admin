export const hasSuperAdminRole = (user) => user && user?.role === 'superAdmin'

export const hasAdminRole = (user) =>
  user && user?.role === 'admin' && user?.isAdmin === true

export const hasAdminLevel = (user) =>
  hasSuperAdminRole(user) || hasAdminRole(user)

export const hasPendingAdmin = (user) =>
  user && user?.role === 'admin' && !user?.isAdmin
