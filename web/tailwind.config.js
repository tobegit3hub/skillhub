/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7f13ec",
        "background-light": "#ffffff",
        "slate-850": "#1f2937",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      boxShadow: {
        'glow': '0 0 20px rgba(127, 19, 236, 0.15)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}
