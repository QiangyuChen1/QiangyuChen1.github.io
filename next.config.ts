import type { NextConfig } from "next";

// User Pages site (qiangyuchen1.github.io): served from the domain root,
// so basePath and assetPrefix stay unset.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
