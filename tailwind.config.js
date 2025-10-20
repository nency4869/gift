/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Hiệu ứng xoay chậm
        'bounce-scale': 'bounce-scale 0.5s ease-in-out', // Hiệu ứng nảy
        'glow': 'glow 2s ease-in-out infinite alternate' // Hiệu ứng viền sáng
      },
      keyframes: {
        'bounce-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'glow': {
          'from': { boxShadow: '0 0 10px #fde047, 0 0 20px #fde047, 0 0 30px #facc15' },
          'to': { boxShadow: '0 0 20px #fde047, 0 0 30px #facc15, 0 0 40px #eab308' }
        }
      }
    },
  },
  plugins: [],
}