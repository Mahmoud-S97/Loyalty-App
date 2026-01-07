/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4b12a3",
        secondary: "#3c3c3c",
        neutral: {
          50: "#ffffff",
          100: "#fafafa",
          200: "#f5f5f5",
          300: "#f0f0f0",
          400: "#dedede",
          500: "#c2c2c2",
          600: "#979797",
          700: "#818181",
          800: "#606060",
          900: "#111111"
        },
        brand: {
          50: "#f4e6f8",
          100: "#e4bfed",
          200: "#d395e2",
          300: "#c269d6",
          400: "#b447cd",
          500: "#a623c3",
          600: "#9720bd",
          700: "#821cb6",
          800: "#7019ae",
          900: "#570a8fff",
        },
        accent: {
          DEFAULT: "#AB8BFF",
          overlay: "rgba(171, 139, 255, 0.56)",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"]
      },
      fontSize: {
        xs: [12, { lineHeight: "14px" }],
        sm: [14, { lineHeight: "18px" }],
        base: [16, { lineHeight: "20px" }],
        lg: [18, { lineHeight: "24px" }],
        xl: [22, { lineHeight: "28px" }],
        "2xl": [26, { lineHeight: "32px" }],
        "3xl": [30, { lineHeight: "36px" }],
      }
    },
  },
  plugins: [],
}