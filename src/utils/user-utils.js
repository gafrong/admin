/**
 * Checks if a user has superAdmin role
 * @param {Object} user - User object that may contain a role property
 * @returns {boolean} - True if user exists and is a superAdmin, false otherwise
 */
export const isSuperAdmin = (user) => user && user?.role === 'superAdmin'
