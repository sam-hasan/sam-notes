module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xs: '0.875rem',
        sm: '1rem',
        xl: '1.375rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
