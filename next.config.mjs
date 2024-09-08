/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_APP_PINATA_API_KEY: process.env.NEXT_APP_PINATA_API_KEY,
      NEXT_APP_PINATA_API_SECRET: process.env.NEXT_APP_PINATA_API_SECRET,
      NEXT_APP_PINATA_GATEWAY: process.env.NEXT_APP_PINATA_GATEWAY,
      NEXT_PUBLIC_WEB3AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
    },
  }
  

export default nextConfig;
