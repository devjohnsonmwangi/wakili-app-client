import daisyui from "daisyui";
import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'soft-yellow': '#FFD700',
        'dark-green': '#6dc26d',
        'button-gradient-start': '#FFA500',
        'button-gradient-end': '#FF4500',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        twinkle: {
          '0%, 100%': { color: '#FFF', transform: 'translateY(0)' },
          '50%': { color: '#FFF5E1', transform: 'translateY(-0.25rem)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        spinFast: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spinFast 0.7s linear infinite',
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite',
        'bounce': 'bounce 0.5s infinite',
      },
      screens: {
        'xs': '250px', 
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '2000px',
      },
    },
  },
  plugins: [daisyui, flowbitePlugin],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cupcake", 
      "retro", 
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ], // Or any other themes you prefer
  },
};
