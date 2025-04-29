/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.jsx",
    "./index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        'move': {
          '0%, 49,99%': {
            opacity: '0',
            zIndex: '1'
          },
          '50%, 100%': {
            opacity: '1',
            zIndex: '50'
          }
        }
      },
      animation: {
        'move': 'move 2s'
      },
      fontFamily: {
        'Josefin': ['Josefin Sans', 'serif']
      },
    },
  },
  plugins: [
  ],
}

