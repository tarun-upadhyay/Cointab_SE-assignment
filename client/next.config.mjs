/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cointab-se-assignment-mr3g.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
