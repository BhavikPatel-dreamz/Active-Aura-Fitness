import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dddemo.net',
        pathname: '/wordpress/**',
      },
    ],
  },
};

export default nextConfig;
