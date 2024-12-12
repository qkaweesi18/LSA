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
        gold: '#FFA500',
      },
      boxShadow: {
        'brutal': '5px 5px 0 0 rgba(0,0,0,1)',
        'brutal-hover': '8px 8px 0 0 rgba(0,0,0,1)',
      },
      fontFamily: {
        sans: ['var(--font-inconsolata)', 'Inconsolata', 'monospace'],
        mono: ['var(--font-geist-mono)'],
        inconsolata: ['var(--font-inconsolata)'],
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
        }
      },
      animation: {
        'shine-0': 'shine-0 4s ease-in-out infinite',
        'shine-1': 'shine-1 4s ease-in-out infinite 1s',
        'shine-2': 'shine-2 4s ease-in-out infinite 2s'
      },
    },
  },
  plugins: [],
}