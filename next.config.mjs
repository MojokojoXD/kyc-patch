/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'storage.cloud.google.com',
          },
        ],
      },
};

export default nextConfig;
