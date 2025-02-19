/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    colors: {
      'pearl': '#F0EDF7',
      'lavender':'#B6BDE7',
      'lightblue': '#6F8BC5',
      'midblue':'#3B4E6D',
      'darkblue':'#434E16'
    },
    extend: {},
  },
  plugins: [],
}