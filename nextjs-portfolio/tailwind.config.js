/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        background: '#15171a',
        card: '#23262b',
        'text-primary': '#f4f4f5',
        'text-secondary': '#e0e7ef',
      },
      borderRadius: {
        'button': '4px',
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(calc(-50%))' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}