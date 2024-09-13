# User Routing Clean-up Plan

## Current Situation
Dead code in our authentication flow that is no longer being executed due to earlier redirects. This code contains valuable routing logic.

## TODO


## Implementation Plan

1. Create a configuration object for user routes:

```javascript
const userRoutes = {
  isAdmin: '/dashboard',
  submitted: '/welcome',
  authenticated: '/onboarding',
  default: '/'
};
```

2. Implement a function to determine the user route:

```javascript
function determineUserRoute(user, status) {
  if (user?.isAdmin) return userRoutes.isAdmin;
  if (user?.submitted) return userRoutes.submitted;
  if (status === 'authenticated') return userRoutes.authenticated;
  return userRoutes.default;
}
```

3. Create a routing function that can be called when needed:

```javascript
function routeUser(user, status) {
  const route = determineUserRoute(user, status);
  console.log(`Routing user to: ${route}`);
  // Actual routing logic here
}
```

## Benefits
- Preserves routing logic for future use
- Makes routing rules more declarative and easier to maintain
- Allows for easy expansion of user states and routes

## Next Steps
2. Decide on the appropriate location for this new code (e.g., a new utility file)
3. Implement the changes
4. Update any affected components or middleware to use the new routing function
5. Remove the legacy code from its current location
6. Test thoroughly to ensure all routing scenarios work as expected

## Notes
- The actual implementation may need to be adjusted based on the specific requirements of our Next.js setup and any existing routing mechanisms.
- Consider implementing this as middleware if it needs to run for every request.
