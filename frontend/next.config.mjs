/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: '/',
      destination: '/home',
      permanent: true,
    },
  ],
}

export default nextConfig
