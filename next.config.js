/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    scrollRestoration: false,
    serverComponentsExternalPackages: ['mdx-bundler'],
  },
}

module.exports = nextConfig;
