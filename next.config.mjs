/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'firebasestorage.googleapis.com',
      pathname: '/**',
      protocol: 'https',
    },
    {
      hostname: 'images.unsplash.com',
      pathname: '/**',
      protocol: 'https',
    },
    {
      hostname: 'plus.unsplash.com',
      pathname: '/**',
      protocol: 'https',
    }
  ]
  }
};

export default nextConfig;
