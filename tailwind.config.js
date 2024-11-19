/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "576px",
      },
      colors: {
        "abyss-black": "#000101",
        "abyss-purple-1": "#10001c",
        "abyss-purple-2": "#3b0764",
        "abyss-purple-3": "#6a428a",
        "abyss-purple-4": "#d6b7ed",
        "abyss-blue-1": "#000414",
        "abyss-blue-2": "#1b264f",
        "abyss-blue-3": "#3c4878",
      },
    },
  },
  plugins: [],
};
