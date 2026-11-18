/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534', // Primary Forest Green
          900: '#14532d',
          950: '#052e16',
        },
        fresh: {
          DEFAULT: '#22C55E', // Secondary Fresh Green
          light: '#4ADE80',
          dark: '#16A34A',
        },
        offwhite: '#F8FAF7',
        charcoal: {
          DEFAULT: '#1F2937',
          light: '#374151',
          muted: '#4B5563',
          dark: '#111827',
        },
        soil: {
          50: '#fbf8f5',
          100: '#f6f0ea',
          500: '#8c6d48',
          700: '#5c4028',
        }
      },
      fontFamily: {
        sans: ['Mukta', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(22, 101, 52, 0.08)',
        'card-hover': '0 10px 25px -3px rgba(22, 101, 52, 0.15)',
      }
    },
  },
  plugins: [],
}
