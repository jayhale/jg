/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Allow email templates to be loaded as a raw string
    config.module.rules.push({
      test: /\.hbs$/,
      use: 'raw-loader',
    })

    return config
  },
}

module.exports = nextConfig
