/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/api/Articles/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
