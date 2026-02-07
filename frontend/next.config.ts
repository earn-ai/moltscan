import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include data and cache directories in serverless functions
  outputFileTracingIncludes: {
    '/api/**/*': ['./data/**/*', './cache/**/*'],
  },
  // Ensure these are treated as server-side only
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path'],
  },
};

export default nextConfig;
