// eslint-disable-next-line @typescript-eslint/no-require-imports
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./app/**/*.{tsx,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-almendra)", ...defaultTheme.fontFamily.serif],
        sans: ["var(--font-andika)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#FFD700",
        secondary: "#FFD700",
        accent: "#FFD700",
        neutral: "#FFD700",
      },
    },
  },
}
