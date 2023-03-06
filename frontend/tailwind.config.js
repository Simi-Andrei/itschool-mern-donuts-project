/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#120a02",
        secondary: "#d4be8a",
        tertiary: "#bf0032",
      },
      boxShadow: {
        shadow: "0px 5px 10px 0px rgba(0,0,0,0.1)",
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
