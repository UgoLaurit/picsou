import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        "polar-night": {
          100: "#2e3440", // Nord 0 - Polar Night 1
          200: "#3b4252", // Nord 1 - Polar Night 2
          300: "#434c5e", // Nord 2 - Polar Night 3
          400: "#4c566a", // Nord 3 - Polar Night 4
        },
        "snow-storm": {
          100: "#d8dee9", // Nord 4 - Snow Storm 1
          200: "#e5e9f0", // Nord 5 - Snow Storm 2
          300: "#eceff4", // Nord 6 - Snow Storm 3
        },
        frost: {
          100: "#8fbcbb", // Nord 7 - Frost 1
          200: "#88c0d0", // Nord 8 - Frost 2
          300: "#81a1c1", // Nord 9 - Frost 3
          400: "#5e81ac", // Nord 10 - Frost 4
        },
        aurora: {
          100: "#bf616a", // Nord 11 - Aurora 1
          200: "#d08770", // Nord 12 - Aurora 2
          300: "#ebcb8b", // Nord 13 - Aurora 3
          400: "#a3be8c", // Nord 14 - Aurora 4
          500: "#b48ead", // Nord 15 - Aurora 5
        },
      },
      spacing: {
        "body-screen": "calc(100vh - 8.75rem)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
