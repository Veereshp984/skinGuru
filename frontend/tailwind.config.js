/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mist: "#dce6dd",
        foam: "#f6f7f2",
        paper: "#fdfdf8",
        ink: "#1f2723",
        sage: "#6b7a6e",
        mint: "#b8d6b1",
        lime: "#86d61d",
        forest: "#223029",
        line: "#dbe4d9",
        blush: "#ff7f8f",
        sand: "#eef2ea",
      },
      fontFamily: {
        sans: ["Avenir Next", "Trebuchet MS", "Segoe UI", "sans-serif"],
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(37, 53, 43, 0.10)",
        device: "0 32px 90px rgba(27, 36, 31, 0.18)",
        halo: "0 20px 60px rgba(124, 151, 128, 0.16)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%": { transform: "translateY(-72px)", opacity: "0.35" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(72px)", opacity: "0.35" },
        },
      },
      animation: {
        rise: "rise 500ms ease forwards",
        float: "float 4.8s ease-in-out infinite",
        scan: "scan 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
