/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "pub-ebc3292441104a07b54e254192a1b246.r2.dev",
      "placehold.co",
      "res.cloudinary.com",
    ],
  },
  optimizeFonts: true,
  env: {
    API_BACKEND: process.env.API_BACKEND,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
  },
};

module.exports = nextConfig;
