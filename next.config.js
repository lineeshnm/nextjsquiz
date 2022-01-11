/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    URL: process.env.NODE_ENV === 'production' ? 'https://productionurl' : 'http://localhost:3000'
  }
}
