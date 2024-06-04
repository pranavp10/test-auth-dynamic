/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  experimental: {
    optimizePackageImports: ["@dynamic-labs/sdk-react-core"],
  },
};

export default nextConfig;
