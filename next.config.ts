import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // Optimize for Vercel edge
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*"],
  },

  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
  },

  async redirects() {
    return [
      {
        source: "/blog/category/fort-bliss",
        destination: "/blog/category/military-pcs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;