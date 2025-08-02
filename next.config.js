/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'localhost',
      'supabase.co',
      'github.io'
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Allow build to continue with type errors for initial setup
  },
  eslint: {
    ignoreDuringBuilds: true, // Allow build to continue with lint errors for initial setup
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'ShowTrackAI',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  // Static export configuration - removed basePath and assetPrefix for Netlify deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/showtrackai-static' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/showtrackai-static' : '',
}

module.exports = nextConfig