/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["Index.html", "index.js"],
  theme: {
    extend: {
      fontFamily: {
        titleText: ["Manufacturing Consent", "sans-serif"],
        primaryText: ["Winky Rough", "sans-serif"],
      },
      colors: {
        primary: "#f0f0f0",
        secondary: "#d1d1d1",
        accent: "#ff6347",
        textPrimary: "#333333",
        textSecondary: "#666666",
      },
    },
  },
  plugins: [],
};
