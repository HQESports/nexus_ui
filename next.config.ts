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
  experimental: {
    serverActions: {
      bodySizeLimit: '10gb',
    },
  },
  turbopack: {},
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

module.exports = nextConfig;