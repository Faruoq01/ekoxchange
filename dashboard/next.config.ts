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
      "source.unsplash.com",
      "images.seeklogo.com",
      "encrypted-tbn0.gstatic.com",
      "ui-avatars.com",
      "res.cloudinary.com",
      "zengo.com",
      "cdn-icons-png.flaticon.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
