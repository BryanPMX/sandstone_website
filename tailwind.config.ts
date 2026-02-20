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
        // Sandstone brand palette (identity.pdf) – prefer CSS vars where possible
        "sandstone-base": "var(--sandstone-off-white)", // off-white for highlights on dark
        "sandstone-bronze": "#8b7355", // bronze accent
        "sandstone-navy": "var(--sandstone-navy)", // #253471
        "sandstone-gold": "#b79678", // sand gold (primary accent)
        "sandstone-bg": "var(--sandstone-off-white)",
        "sandstone-text": "var(--sandstone-charcoal)",
        "sandstone-brown": "#4a4f5c",
        "sandstone-maroon": "var(--sandstone-navy-deep)", // deep navy
        "sandstone-off-white": "var(--sandstone-off-white)",
        "sandstone-charcoal": "var(--sandstone-charcoal)",
        "sandstone-sand-gold": "var(--sandstone-sand-gold)",
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
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
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
