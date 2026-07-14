/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Radix UI token passthrough
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
        // Brand palette
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        cyan: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
        },
        surface: {
          DEFAULT: "#0d1526",
          card:    "#111d35",
          hover:   "#162040",
          input:   "#0a1020",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%":       { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-6px)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in":        "fade-in 0.4s ease-out both",
        "fade-up":        "fade-up 0.5s ease-out both",
        "fade-up-delay":  "fade-up 0.5s ease-out 0.15s both",
        "fade-up-delay2": "fade-up 0.5s ease-out 0.3s both",
        shimmer:          "shimmer 1.6s linear infinite",
        "glow-pulse":     "glow-pulse 3s ease-in-out infinite",
        float:            "float 3s ease-in-out infinite",
        "scale-in":       "scale-in 0.3s ease-out both",
        "slide-right":    "slide-in-right 0.4s ease-out both",
        "spin-slow":      "spin-slow 8s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        shimmer:
          "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.08) 40%, rgba(99,102,241,0.15) 50%, rgba(99,102,241,0.08) 60%, transparent 100%)",
      },
      boxShadow: {
        brand:    "0 4px 24px -2px rgba(99,102,241,0.35)",
        "brand-lg": "0 8px 40px -4px rgba(99,102,241,0.45)",
        glow:     "0 0 20px rgba(99,102,241,0.4)",
        card:     "0 2px 20px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
}
