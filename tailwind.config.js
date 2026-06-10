/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fef2f2',
          100: '#ffe4e4',
          200: '#ffc9c9',
          300: '#ffa1a1',
          400: '#ff6b6b',
          500: '#f83434',
          600: '#e51111',
          700: '#c10909',
          800: '#a00b0b',
          900: '#840e0e',
          950: '#480202',
        },
        ink: {
          50:  '#f6f7f9',
          100: '#eceef2',
          200: '#d4d9e3',
          300: '#aeb8ca',
          400: '#8291aa',
          500: '#62748f',
          600: '#4e5d76',
          700: '#404d61',
          800: '#374052',
          900: '#1a2030',
          950: '#0d1117',
        },
        gold: '#c9a84c',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        japanese: ['"Noto Serif JP"', 'serif'],
      },
      boxShadow: {
        'glow-red': '0 0 40px rgba(220,38,38,0.3)',
        'glow-sm': '0 0 20px rgba(220,38,38,0.15)',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
