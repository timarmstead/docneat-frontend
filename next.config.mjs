/** @type {import('next').NextConfig} */
const nextConfig = {
  // This ensures the variables are available to the server-side code
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  // Optional: recommended for Next.js 14+ stability
  reactStrictMode: true,
};

export default nextConfig;