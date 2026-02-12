import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sandstone Real Estate brand palette (strict adherence)
        "sandstone-base": "#f2f2f5", // light neutral for highlights on dark backdrops
        "sandstone-bronze": "#b79678", // sand gold accent
        "sandstone-navy": "#253471", // primary navy
        "sandstone-gold": "#70543c", // deeper sand gold for stronger contrast on light backgrounds
        "sandstone-bg": "#f7f8fb", // soft page background
        "sandstone-text": "#2d2f36", // primary body text (gray)
        "sandstone-brown": "#4a4f5c", // deeper gray accent
        "sandstone-maroon": "#1d2858", // deeper navy for gradients
        // Shadcn/UI semantic mapping
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Minerva Modern", "Montserrat", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat-bold)", "var(--font-montserrat)", "Montserrat", "Minerva Modern", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(246, 239, 231, 0.9) 0%, rgba(184, 135, 70, 0.3) 100%)",
        "glass-dark":
          "linear-gradient(135deg, rgba(75, 31, 47, 0.78) 0%, rgba(58, 43, 37, 0.58) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
