/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.25rem",
      },
      colors: {
        clifford: "#da373d",
      },
    },
  },
  plugins: [],
};
