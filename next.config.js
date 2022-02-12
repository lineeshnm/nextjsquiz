/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    URL: process.env.NODE_ENV === 'production' ? 'https://productionurl' : 'http://localhost:3000',
    MONGODB_URI : "mongodb://localhost:27017/nextjsquiz",
    MONGODB_DB: "nextjsquiz",
    APP_NAME: "Lineesh QuizApp"
  }
}
