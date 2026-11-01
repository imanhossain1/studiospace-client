/** @type {import('next').NextConfig} */
const nextConfig = {
  /* External Image URL Configuration */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /* React Compiler */
  reactCompiler: true,

  /* Turbopack Configuration */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;