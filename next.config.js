/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ]
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Neural Health ID',
    NEXT_PUBLIC_APP_VERSION: '5.0.0',
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'health-id.in'
  },

  // Image optimization
  images: {
    domains: ['avatars.githubusercontent.com'],
    formats: ['image/avif', 'image/webp']
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/health-id.in',
        destination: '/',
        permanent: true
      }
    ]
  }
};

module.exports = nextConfig;
