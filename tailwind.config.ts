import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#F5F7FA", dark: "#0A0D12" },
        surface: { DEFAULT: "#FFFFFF", dark: "#12161D" },
        border: { DEFAULT: "#E2E6EC", dark: "#212733" },
        ink: { DEFAULT: "#0B0E14", dark: "#F3F5F8" },
        muted: { DEFAULT: "#5B6472", dark: "#8791A3" },
        accent: "#2F6FFF",
        "accent-hover": "#4C82FF",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "'IBM Plex Sans Arabic'", "sans-serif"],
        body: ["Inter", "'IBM Plex Sans Arabic'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
