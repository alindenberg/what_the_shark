/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false  // Disable SWC minification (caused issues after importing headlessui components?)
};

export default nextConfig;
