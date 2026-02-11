/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8c2bee",
        "background-light": "#f7f6f8",
        "background-dark": "#0d0221",
        "deep-purple": "#1a0b2e",
        "lavender-glow": "#b794f4",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
