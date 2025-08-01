import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/tarifas',
        destination: '/servicios#tarifas',
        permanent: true,
      },
       {
        source: '/#tarifas',
        destination: '/servicios#tarifas',
        permanent: true,
      },
       {
        source: '/#servicios',
        destination: '/servicios',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
