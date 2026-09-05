import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
