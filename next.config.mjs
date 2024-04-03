/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["lh3.googleusercontent.com", "vercel.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/github",
  //       destination: "https://github.com/steven-tey/precedent",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
