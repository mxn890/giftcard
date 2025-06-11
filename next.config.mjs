/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["images.unsplash.com"], // add allowed external image domains here
    },
    eslint:{
        ignoreDuringBuilds: true,
    }
  };
  
  export default nextConfig;
  