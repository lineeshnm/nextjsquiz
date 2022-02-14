/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    URL: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000',
    MONGODB_DB: "nextjsquiz",
    APP_NAME: "Lineesh QuizApp"
  }
}
