import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        board: "#0F1A14",
        panel: "#16241C",
        panelBorder: "#28392F",
        copper: "#C97A4A",
        copperLight: "#E0A377",
        trace: "#7FE8B0",
        ink: "#EDEAE0",
        muted: "#8FA396",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(#28392F 1px, transparent 1px), linear-gradient(90deg, #28392F 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
    },
  },
  plugins: [],
};

export default config;
