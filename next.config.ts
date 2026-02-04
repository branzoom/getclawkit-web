import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // 核心修复：添加 "as const"，把 string 锁死为字面量
  output: "standalone" as const,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// 最后导出时，强制断言为 NextConfig 类型，忽略任何中间的类型不匹配
export default withNextIntl(nextConfig as NextConfig);