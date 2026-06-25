import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09090b",
        paper: "#fff7ef",
        pixel: {
          page: "var(--pixel-page-bg)",
          "page-soft": "var(--pixel-page-bg-soft)",
          surface: "var(--pixel-surface)",
          "surface-soft": "var(--pixel-surface-soft)",
          ink: "var(--pixel-ink)",
          muted: "var(--pixel-ink-muted)",
          navy: {
            950: "var(--pixel-navy-950)",
            900: "var(--pixel-navy-900)",
            850: "var(--pixel-navy-850)",
            800: "var(--pixel-navy-800)"
          },
          blue: {
            700: "var(--pixel-blue-700)",
            600: "var(--pixel-blue-600)",
            500: "var(--pixel-blue-500)",
            400: "var(--pixel-blue-400)"
          },
          cyan: "var(--pixel-cyan-400)",
          violet: "var(--pixel-violet-500)",
          green: "var(--pixel-green-500)",
          border: "var(--pixel-border)"
        },
        phantom: {
          red: "#e50914",
          crimson: "#b3000f",
          yellow: "#ffd100",
          cyan: "#00d5ff",
          black: "#050505",
          white: "#fffaf3"
        }
      },
      boxShadow: {
        slash: "10px 10px 0 #050505",
        "slash-red": "10px 10px 0 #e50914",
        "pixel-soft": "var(--pixel-shadow-soft)",
        "pixel-card": "var(--pixel-shadow-card)",
        "pixel-lift": "var(--pixel-shadow-lift)"
      },
      borderRadius: {
        "pixel-xs": "var(--pixel-radius-xs)",
        "pixel-sm": "var(--pixel-radius-sm)",
        "pixel-md": "var(--pixel-radius-md)",
        "pixel-lg": "var(--pixel-radius-lg)",
        "pixel-xl": "var(--pixel-radius-xl)"
      },
      backgroundImage: {
        "pixel-page": "var(--pixel-gradient-hero)",
        "pixel-accent": "var(--pixel-gradient-accent)",
        "pixel-text": "var(--pixel-gradient-text)",
        "pixel-grid": "linear-gradient(var(--pixel-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--pixel-grid-line) 1px, transparent 1px)"
      },
      backgroundSize: {
        "pixel-grid": "var(--pixel-grid-size) var(--pixel-grid-size)"
      },
      animation: {
        "pixel-float": "pixel-float-subtle 7s ease-in-out infinite",
        "pixel-sparkle": "pixel-sparkle-twinkle 4.2s steps(2, end) infinite"
      },
      keyframes: {
        "pixel-float-subtle": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -8px, 0)" }
        },
        "pixel-sparkle-twinkle": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.76" }
        }
      },
      fontFamily: {
        display: ["Bahnschrift", "Aptos Display", "Segoe UI Variable Display", "Arial Narrow", "Inter", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
