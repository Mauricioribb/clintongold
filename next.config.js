/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'clintongold.com.br',
      'www.transparenttextures.com',
      'pub-*.r2.dev',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
    ],
  },
  // Configuração para Cloudflare Pages
  output: 'standalone',
};

module.exports = nextConfig;
