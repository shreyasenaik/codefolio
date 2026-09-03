/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        cyber: ['Orbitron', 'sans-serif']
      },
      colors: {
        cyber: {
          pink: '#ff007f',
          neon: '#00f0ff',
          yellow: '#faed26',
          purple: '#9d00ff',
          dark: '#0a0a12',
          card: '#121124'
        }
      }
    },
  },
  plugins: [],
}
