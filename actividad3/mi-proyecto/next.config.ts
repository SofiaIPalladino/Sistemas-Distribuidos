/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com', // El dominio de Amazon
      'www.themoviedb.org', // El nuevo dominio de TMDb
    ],
  },
};

module.exports = nextConfig;