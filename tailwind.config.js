// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-pacifico)", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        primary: "#FFD700",
        secondary: "#FFD700",
        accent: "#FFD700",
        neutral: "#FFD700",
      },
    },
  },
  plugins: [],
}
