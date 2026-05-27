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
        "slash-red": "10px 10px 0 #e50914"
      },
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "Arial Black", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
