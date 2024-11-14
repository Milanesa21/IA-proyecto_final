/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye archivos en `src`
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',      // Gris oscuro
        secondary: '#4B5563',    // Gris intermedio
        accent: '#F59E0B',       // Naranja brillante
        background: '#111827',   // Gris casi negro
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],   // Fuente para una apariencia moderna
        title: ['Roboto', 'sans-serif'],   // Fuente para títulos
      },
    },
  },
  // tailwind.config.js
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        slideInUp: 'slideInUp 1s ease-out',
      },
    },
  },
};
