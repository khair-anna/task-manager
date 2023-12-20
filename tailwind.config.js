/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-blue': '#D2E6FC',
        'main-blue': '#046BF3',
        'primary-dark': '#333333',
        'light-gray': '#909395',
        'bg-color': '#EEEEEE',
        'dark-bg-color': '#333333',
        'dark-bg-black': '#111315',
        'dark-grey': '#888585'
      }
    },
    fontFamily: {
      Roboto: ['Roboto,sans-serif']
    }
  },
  plugins: []
}
