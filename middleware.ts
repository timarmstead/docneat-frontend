import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  // Middleware logic stays empty for now to allow all traffic
}, {
  // Use the hard-coded publishable key that matched your layout
  publishableKey: "pk_live_Y2xlcmsuZG9jbmVhdC5jb20k",
  
  // HARD-CODED SECRET KEY: Replace the string below with your actual sk_live_... key
  // This bypasses the need for Vercel to look at the Dashboard/process.env
  secretKey: "sk_live_sWwNrq8yJDudwp8TfgdqsJPPc246TExnGVOfq9Qb7w",
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, etc)
     */
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};