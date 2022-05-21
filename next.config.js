/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'giphy.com',
      'media2.giphy.com',
      'media1.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com',
      'media5.giphy.com',
      'media6.giphy.com'
    ]
  }
}

module.exports = nextConfig
