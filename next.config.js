/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    URL: process.env.NODE_ENV === 'production' ? 'https://productionurl' : 'http://localhost:3000',
    MONGODB_URI : "mongodb+srv://taskapp:taskapptaskapp@cluster0.ejphg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    MONGODB_DB: "nextjsquiz",
    APP_NAME: "Lineesh QuizApp"
  }
}
