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
        port: '', // Remove the wildcard port
        pathname: '/**', // Use /** to match all paths
      },
      {

        protocol: 'https',
        hostname: 'zhegunthacymly5i.public.blob.vercel-storage.com',
        port: '', // Remove the wildcard port
        pathname: '/**', // Use /** to match all paths
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

module.exports = nextConfig;