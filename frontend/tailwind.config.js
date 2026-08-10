/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B5948',
        secondary: '#98A484',
        accent: '#B29146',
        'color-dark': '#544F2F',
        'color-gray': '#9E9A8E',
        'color-light': '#DDDEB2',
        'color-pink': '#F9C0C5',
        'color-teal': '#D5E6DE',
        'color-blue': '#7D9DBB',
      },
    },
  },
  plugins: [],
}