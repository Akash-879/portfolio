/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/PortFolio',
    assetPrefix: '/PortFolio/',
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
