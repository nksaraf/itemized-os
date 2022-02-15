module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{tsx,ts,jsx,js}",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: require("tailwindcss/colors"),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@vechaiui/core")],
};
