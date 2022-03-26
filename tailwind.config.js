module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "roboto-slab": ["Roboto Slab", "serif"],
      roboto: ["Roboto ", "sans-serif"],
    },
    screens: {
      us: "420px",
    },
    extend: {
      boxShadow: {
        0: "-1px 2px 16px 0 rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
