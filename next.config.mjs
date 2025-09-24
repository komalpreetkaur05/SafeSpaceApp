/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  rewrites: async () => [
    {
      source: "/sign-in",
      destination: "/sign-in/ [[...index]]",
    },
    {
      source: "/sign-up",
      destination:"/sign-up/[[...index"
    }
  ]
};

export default nextConfig;
