/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandYellow: "#FFD700",
        brandGreen: "#008000",
        brandBlack: "#000000",
        brandWhite: "#FFFFFF",
        // subtle yellow card tint
        cardYellow: "#FFF7CC"
      }
    }
  },
  plugins: [],
};
