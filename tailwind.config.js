/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Primary Accents */
        magenta: "#CC3366",
        "magenta-light": "#E85A8A",
        cyan: "#00EDFF",
        "cyan-light": "#C5F8FF",
        "cyan-secondary": "#00DEFF",
        teal: "#066AAB",
        /* Backgrounds - Dark Mode */
        background: "#000000",
        surface: "#1D1D1D",
        "surface-light": "#262626",
        "surface-dark-soft": "#1D1D1D",
        /* Text - Dark Mode */
        text: "#FFFFFF",
        "text-dark": "#FFFFFF",
        "text-secondary": "#C5C5C5",
        "text-muted": "#ABB8C3",
        "text-light": "#FFFFFF",
        /* Borders */
        border: "#333333",
        "border-secondary": "#404040",
        /* Semantic */
        error: "#CF2E2E",
        warning: "#FCB900",
      },
      fontFamily: {
        display: ["Space Grotesk", "Rokkitt", "sans-serif"],
        body: ["Space Grotesk", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        ui: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        'raised': '0px 2px 8px rgba(0, 0, 0, 0.3)',
        'elevated': '0px 4px 16px rgba(0, 0, 0, 0.4)',
        'floating': '0px 8px 32px rgba(0, 0, 0, 0.5)',
        'maximum': '0px 12px 48px rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        'minimal': '3px',
        'card': '15px',
        'image': '25px',
        'pill': '50px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
    },
  },
  plugins: [],
}