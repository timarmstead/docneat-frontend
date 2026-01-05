/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  // Force Vercel to treat this as a new build (helps with stuck cache)
  output: 'standalone',  // optional but often helps with build consistency
};

module.exports = nextConfig;
