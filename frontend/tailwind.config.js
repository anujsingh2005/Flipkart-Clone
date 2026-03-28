/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flipkart: {
          blue: '#1F77DB',
          lightblue: '#E5F1FF',
          yellow: '#FFB800',
          lightgray: '#EBEBEB',
        },
      },
    },
  },
  plugins: [],
};

