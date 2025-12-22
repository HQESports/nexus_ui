import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'nexusbucketpubg.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zhegunthacymly5i.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  // Ensure Turbopack is explicitly configured (empty) so Next.js doesn't error
  // when a custom webpack config is present. See Next.js 16 turbopack guidance.
  turbopack: {},
  webpack: (config) => {
    // This is to handle the canvas module not found error
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

module.exports = nextConfig;