import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // Inspiration Day 2026 is over — tickets are closed; send visitors to the highlights.
      { source: '/tickets', destination: '/2026-highlights', permanent: false },
      // Streaming has ended — the /watch page is retired.
      { source: '/watch', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
