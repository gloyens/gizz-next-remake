/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mdx-bundler'],
  },
}

module.exports = nextConfig;
