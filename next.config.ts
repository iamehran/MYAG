import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Required for Three.js and React Flow in Next.js 14
  transpilePackages: [],
};

export default nextConfig;
