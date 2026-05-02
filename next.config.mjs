/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    // Marketing site is fully static; no /api/* proxying.
    async redirects() {
        return [];
    },
};

export default nextConfig;
