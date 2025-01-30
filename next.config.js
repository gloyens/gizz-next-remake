/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: false,
    serverComponentsExternalPackages: ["mdx-bundler"],
  },
};

module.exports = nextConfig;
