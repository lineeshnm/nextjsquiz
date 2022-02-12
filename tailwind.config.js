module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '100-r': '100rem',
        '80-r': '80rem',
        '60-r': '60rem',
        '40-r': '40rem',
        '35-r': '35rem',
        '30-r': '30rem',
        '26-r': '26rem'
      },
      height: {
        '100-r': '100rem',
        '80-r': '80rem',
        '60-r': '60rem',
        '40-r': '40rem',
        '35-r': '35rem',
        '30-r': '30rem',
        '26-r': '26rem'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      boxShadow: {
        '5xl': '20px 20px 50px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
