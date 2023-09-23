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
          foreground: "#11181C",
          background: "#D9D9D9",
          primary: "#C86464",
          secondary: "#969696",
          accent: "#33292B",
          highlight: "#0DB3FF",
          muted: "#797D7F",
          success: "#ffffff",
          info: "#1E66B5",
          warning: "#D5CF09",
          error: "#BD1B1B",
          divider: "#16160B",
          overlay: "#0C0C09",
          focus: "#56D4FF",
          content1: "#BDBDBD",
          content2: "#585858",
          content3: "#2E2E2E",
          content4: "#1C1C1C",
        }, // light theme colors
      },
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {
          foreground: "#ECEDEE",
          background: "#1A1A1A",
          primary: "#FC2E61",
          secondary: "#2900B4",
          accent: "#8300B4",
          highlight: "#B4008B",
          muted: "#B42900",
          success: "#000000",
          info: "#000000",
          warning: "#000000",
          error: "#B40031",
          divider: "#C8C8C8",
          overlay: "#0A0A0A",
          focus: "#000000",
          content1: "#212121",
          content2: "#000000",
          content3: "#000000",
          content4: "#000000",
        }, // dark theme colors
      },
      // ... custom themes
    },
  }),
],
};

