import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "c.pxhere.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
