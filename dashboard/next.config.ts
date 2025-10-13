import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "etherscan.io",
      "cryptologos.cc",
      "coin-images.coingecko.com",
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
      "i.pravatar.cc",
    ],
  },
};

export default nextConfig;
