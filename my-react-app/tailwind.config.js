/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          950: '#08080c',
          900: '#0b0b12',
          800: '#11111b',
          700: '#1a1a25',
          600: '#262633',
          500: '#3a3a4a',
        },
        accent: {
          50: '#f5f0ff',
          100: '#ece2ff',
          200: '#d6c2ff',
          300: '#bb9aff',
          400: '#a078ff',
          500: '#8a5cff',
          600: '#7340ff',
          700: '#5a2bff',
        },
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, #08080c 90%), radial-gradient(circle at 50% 0%, rgba(138,92,255,0.18), transparent 60%)',
        'aurora':
          'conic-gradient(from 90deg at 50% 50%, #8a5cff 0%, #5a2bff 25%, #00d4ff 50%, #8a5cff 75%, #5a2bff 100%)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'float-slow': 'float-slow 14s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        breathe: 'breathe 2.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'gradient-pan': 'gradient-pan 8s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(138,92,255,0.45)',
        'glow-lg': '0 0 120px -20px rgba(138,92,255,0.55)',
      },
    },
  },
  plugins: [],
}
