/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Lato", "sans-serif"],
      },
      colors: {
        darkBrown: "#422006"
      }
    },
  },
  plugins: [],
}