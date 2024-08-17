/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '*',
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
}

export default nextConfig
