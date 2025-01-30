/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        display: ['Syncopate', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slide-up 1s ease-out forwards',
        'glow': 'glow 4s ease-in-out infinite',
        'border-pulse': 'borderPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)',
            filter: 'brightness(1)'
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(5deg)',
            filter: 'brightness(1.2)'
          },
        },
        pulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px var(--tw-colors-primary)',
            filter: 'brightness(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px var(--tw-colors-primary)',
            filter: 'brightness(1.2)'
          },
        },
        borderPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 107, 53, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 107, 53, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};