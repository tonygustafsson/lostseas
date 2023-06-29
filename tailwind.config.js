// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lostSeasTheme: {
          primary: "#0e7490",
          secondary: "#6b7280",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    logs: false,
  },
}
