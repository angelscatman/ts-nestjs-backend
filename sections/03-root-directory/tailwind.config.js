/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        paper: '#f1f1f1',
        frame: '#b9b9b9',
        ink: '#1d1d1d',
        heading: '#163b23',
        muted: '#4f4f4f',
        link: '#003c8f',
      },
      boxShadow: {
        docs: '0 1px 0 #ffffff inset, 0 8px 24px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
