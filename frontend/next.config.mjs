/** @type {import('next').NextConfig} */
const nextConfig = {
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
