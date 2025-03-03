/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
    unoptimized: process.env.NODE_ENV === 'development',
    loader: 'default',
    domains: [],
    path: '/_next/image',
    loaderFile: '',
    disableStaticImages: false
  },
  // ... other next.js config
};

// Use CommonJS export
module.exports = nextConfig; 