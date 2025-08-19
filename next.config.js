/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3845',
        pathname: '/assets/**',
      },
    ],
    unoptimized: false,
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'scripts'],
  },
}

module.exports = nextConfig 