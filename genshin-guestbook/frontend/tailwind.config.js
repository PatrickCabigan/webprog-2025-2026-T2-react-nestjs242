/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genshin: {
          gold: '#FFD700',
          teal: '#4ECDC4',
          dark: '#2C3E50',
          purple: '#9b59b6',
          red: '#e74c3c',
        }
      },
      fontFamily: {
        genshin: ['"ZCOOL KuaiLe"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: 1, textShadow: '0 0 10px #FFD700' },
          '50%': { opacity: 0.8, textShadow: '0 0 20px #FFD700' },
        },
      },
    },
  },
  plugins: [],
}