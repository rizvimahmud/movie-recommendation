const { fontFamily, screens } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js, jsx, ts, tsx}",
    "./components/**/*.{js, jsx, ts, tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },

      screens: {
        xs: "375px",
        ...screens,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
