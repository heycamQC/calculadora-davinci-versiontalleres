/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Redefinimos los colores base para que coincidan con DaVinci
        blue: {
          50: '#eaedf3',
          100: '#bf96ea', // Variante clara del secundario
          500: '#5e03c3',
          600: '#5d0a9e', // Secundario base
          700: '#454856', 
        },
        gray: {
          50: '#ffffff',
          100: '#eaedf3', // Variante más clara del terciario
          200: '#afb3bd',
          300: '#747886',
          400: '#575b6b',
          500: '#454856', // Terciario base
          600: '#454856',
          700: '#454856',
          800: '#454856',
          900: '#454856',
        }
      }
    },
  },
  plugins: [],
}