import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
 
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  images: {
    domains: [
      "storage.googleapis.com",
      "images.unsplash.com",
      "flowbite.s3.amazonaws.com",
    ],
    minimumCacheTTL: 1500000,
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
