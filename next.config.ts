import type { NextConfig } from 'next';

const nextConfig = {
  // 核心修复：添加 "as const"，把 string 锁死为字面量
  output: "standalone" as const,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ]
  }
};

export default nextConfig;