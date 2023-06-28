/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 12px black',
        'dice': "2px 2px 5px black"
      }
      
    },
  plugins: [],
}}
