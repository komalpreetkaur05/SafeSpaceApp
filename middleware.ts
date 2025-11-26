// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/force-password-reset(.*)',
  '/api/webhooks/clerk(.*)', // Allow clerk webhooks
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not explicitly marked as public.
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};