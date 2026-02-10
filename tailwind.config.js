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
        primary: "#621ce5",
        secondary: "#232323",
        neutral: {
          50: "#ffffff",
          100: "#fafafa",
          200: "#f2f2f2",
          300: "#e6e6e6",
          400: "#d4d4d4",
          500: "#bdbdbd",
          600: "#9a9a9a",
          700: "#7a7a7a",
          800: "#5a5a5a",
          900: "#1a1a1a",
          950: "#101010ff",
        },
        brand: {
          50: "#f3f2ff",
          100: "#ebe8ff",
          200: "#d9d3ff",
          300: "#beb0ff",
          400: "#9e84ff",
          500: "#8052ff",
          600: "#712ef9",
          700: "#621ce5",
          800: "#5618c9",
          900: "#45159d",
          950: "#280a6b",
        },
        accent: {
          DEFAULT: "#beb0ff",
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