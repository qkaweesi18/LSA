/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
      },
      boxShadow: {
        'brutal': '5px 5px 0 0 rgba(0,0,0,1)',
        'brutal-hover': '8px 8px 0 0 rgba(0,0,0,1)',
      },
      keyframes: {
        'shine-0': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 }
        },
        'shine-1': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.15 }
        },
        'shine-2': {
          '0%, 100%': { opacity: 0.05 },
          '50%': { opacity: 0.1 }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%) rotate(-2deg)' },
          '100%': { transform: 'translateX(0) rotate(-2deg)' }
        }
      },
      animation: {
        'shine-0': 'shine-0 4s ease-in-out infinite',
        'shine-1': 'shine-1 4s ease-in-out infinite 1s',
        'shine-2': 'shine-2 4s ease-in-out infinite 2s',
        'slide-in': 'slide-in 0.5s ease-out'
      },
    },
  },
  plugins: [],
}