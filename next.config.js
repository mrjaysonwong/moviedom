/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  env: {
    apiKey: process.env.API_KEY,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiKey: process.env.API_KEY,
  },
};

module.exports = nextConfig;
