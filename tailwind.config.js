/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // или путь к вашим файлам
  ],
  theme: {
    extend: {
      fontSize: {
        '18px': '18px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({
      addBase,
      theme
    }) {
      addBase({
        'html': {
          fontFamily: theme('fontFamily.sans'),
          backgroundColor: theme('colors.gray.100'),
          color: theme('colors.gray.900'),
        },
        'body': {
          margin: 0,
          padding: 0,
          backgroundColor: theme('colors.gray.100'),
          color: theme('colors.gray.900'),
        },
        'input': {
          width: '100%',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.lg'),
          borderBottomWidth: theme('borderWidth.2'),
          borderColor: theme('colors.gray.300'),
          '&:focus': {
            outline: '1px solid rgba(0, 0, 0, 0.2)',
          },
        },
      });
    },
  ],
};
