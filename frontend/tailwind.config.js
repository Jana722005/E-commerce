/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
      },
      colors: {
        // Sophisticated, premium organic-grocery deep emerald/mint palette
        green: {
          50: '#f2f8f5',
          100: '#e1f0e7',
          200: '#c2dfcf',
          300: '#94c7ad',
          400: '#61a783',
          500: '#3c8b64',
          600: '#2b6e4f', // Highly premium organic forest/sage emerald
          700: '#20563e',
          800: '#1b4532',
          900: '#153628',
          950: '#0c1f17',
        },
        // Premium natural Warm Stone/Slate palette instead of boring cold grays
        gray: {
          50: '#fbfbfb',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Rich amber/honey for organic ratings and badges
        yellow: {
          50: '#fefdf3',
          100: '#fefbe6',
          200: '#fcf5bf',
          300: '#faea8c',
          400: '#f6d54d',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(27, 69, 50, 0.08), 0 1px 3px rgba(27, 69, 50, 0.02)',
        'premium-hover': '0 20px 40px -15px rgba(27, 69, 50, 0.15), 0 1px 5px rgba(27, 69, 50, 0.05)',
        'glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.3), 0 8px 32px 0 rgba(27, 69, 50, 0.05)',
      }
    },
  },
  plugins: [],
}