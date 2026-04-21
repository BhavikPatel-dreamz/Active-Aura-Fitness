import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.activeaurafitness.com',
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
