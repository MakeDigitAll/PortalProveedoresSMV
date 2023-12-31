const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      light: {
        layout: {}, // light theme layout tokens
        colors: {
          foreground: "##FEFCE8",
          background: "#f4f0dd",
          primary: "#F9C97C",
          secondary: "#969696",
          accent: "#FF6347",
          highlight: "#0DB3FF",
          muted: "#797D7F",
          success: "#ffffff",
          info: "#1E66B5",
          warning: "#D5CF09",
          error: "#BD1B1B",
          divider: "#16160B",
          overlay: "#0C0C09",
          focus: "#56D4FF",
          content1: "#B9B78C",
          content2: "#585858",
          content3: "#2E2E2E",
          content4: "#1C1C1C",
        }, // light theme colors
        yellow : {
          50: "#FEFCE8",
          100: "#FDEDD3",
          200: "#FBDBA7",
          300: "#F9C97C",
          400: "#F7B750",
          500: "#F5A524",
          600: "#C4841D",
          700: "#936316",
          800: "#62420E",
          900: "#312107",
        },
      },
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {
          foreground: "#FFFFFF",
          background: "#1A1A1A",
          primary: "#F5A524",
          secondary: "#645c3c",
          accent: "#F9F382",
          highlight: "#FF6347",
          muted: "#B42900",
          success: "#000000",
          info: "#000000",
          warning: "#000000",
          error: "#B40031",
          divider: "#C8C8C8",
          overlay: "#0A0A0A",
          focus: "#000000",
          content1: "#333333",
          content2: "#CCCCCC",
          content3: "#000000",
          content4: "#000000",
        }, // dark theme colors
        yellow : {
          50: "#FEFCE8",
          100: "#FDEDD3",
          200: "#FBDBA7",
          300: "#F9C97C",
          400: "#F7B750",
          500: "#F5A524",
          600: "#C4841D",
          700: "#936316",
          800: "#62420E",
          900: "#312107",
        },
      },
      // ... custom themes
    },
  }),
],
};

