/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#09090b',
        crimson: { 600: '#dc2626', 700: '#b91c1c', 500: '#ef4444' }
      }
    },
  },
  plugins: [],
}
