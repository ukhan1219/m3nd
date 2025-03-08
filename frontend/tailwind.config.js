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
      'lightlavender':"#D5DDFA",
      'lightblue': '#6F8BC5',
      'midblue':'#3B4E6D',
      'darkblue':'#262F50',
    },
    fontFamily: {
      Sora: ['Sora', 'serif'],
      Kanit: ['Kanit', 'serif'],
      Dongle: ['Dongle', 'serif'],
    },
    extend: {
      screens: {
        'min-2000': '2000px',
    },

    },
  },
  plugins: [],
}