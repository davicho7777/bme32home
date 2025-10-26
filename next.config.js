/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you need to allow specific external packages on the server, use:
  // serverExternalPackages: [],
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig