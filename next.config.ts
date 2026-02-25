import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true
  },
  output: "standalone",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    esmExternals: false,
  },
  devIndicators: false,
};

export default nextConfig;
