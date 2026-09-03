/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'left': 'scroll-left linear infinite',
        'right': 'scroll-right linear infinite',
      },
      spacing: {
        '84': '21rem',
        '88': '22rem',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Changed from -100% to -50%
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' }, // Start halfway
          '100%': { transform: 'translateX(0)' },   // Move to start
        },
      },
    },
  },
  plugins: [],
}