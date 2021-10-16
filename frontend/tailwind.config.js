module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        crimsonRed: "#F32D20",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
