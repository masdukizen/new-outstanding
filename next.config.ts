import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/send-message",
        destination: "https://new-po-production.up.railway.app/kirim",
      },
    ];
  },
};

export default nextConfig;
