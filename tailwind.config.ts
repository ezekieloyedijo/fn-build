import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        muted: "hsl(var(--muted))",
        primary: {
          DEFAULT: "#d97706",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        steel: {
          50: "#f4f6f8",
          100: "#e4e9ee",
          200: "#c8d2dc",
          300: "#a1b1c1",
          400: "#7489a0",
          500: "#556d85",
          600: "#43566c",
          700: "#374558",
          800: "#252f3d",
          900: "#0f1620",
          950: "#080c12",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(120deg,#d97706 0%,#f59e0b 35%,#fbbf24 60%,#d97706 100%)",
      },
      keyframes: {
        gradientMove: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        gradientMove: "gradientMove 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 22, 32, 0.25)",
        glow: "0 0 40px 0 rgba(217,119,6,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
