/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 静态导出，支持多个平台部署
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
