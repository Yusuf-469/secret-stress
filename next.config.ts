import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable Turbopack to avoid cache issues
    // turbopack: false
  },
};

export default nextConfig;

