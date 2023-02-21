/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pri: "#696969",
        sec: "#9bff00",
        ter: "#050505",
      },
      fontFamily: {
        Inter: ["Inter", "san-serif"],
      },
    },
  },
  plugins: [],
};
