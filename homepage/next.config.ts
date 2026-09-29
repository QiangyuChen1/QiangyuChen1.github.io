import type { NextConfig } from "next";

// User Pages site (qiangyuchen1.github.io): served from the domain root,
// so basePath and assetPrefix stay unset.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Dev only: without this, pages opened at 127.0.0.1 never hydrate (reveals stay invisible).
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
