const defaultTheme = require("tailwindcss/defaultTheme");

const primaryBright = "#00FFC0";
const primaryDark = "#16D0A2";

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx", "index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        21: "5.25rem"
      },
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: primaryBright,
          bright: primaryBright,
          dark: primaryDark,
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
          },
        },
      }),
      fill: (theme) => theme('colors')
    },
  },
  variants: {
    extend: {
      fill: ['hover']
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
