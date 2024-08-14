/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
  redirects: () => [
    {
      source: '/',
      destination: '/home',
      permanent: true,
    },
  ],
  env: {
    BASE_URL: process.env['PUBLIC_API_URL'],
  },
}

export default nextConfig
