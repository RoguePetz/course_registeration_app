import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 👈 Add this
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  /* config options here */
};

export default nextConfig;
