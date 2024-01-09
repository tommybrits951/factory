/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        xl: "10px 10px 8px 6px rgba(0,0,0,0.6)",
        "2xl": "0 10px 10px 10px rgba(0,0,0,0.7)",
      },
    },
    fontFamily: {
      times: ["Times New Roman"],
      cam: ["Cambria"],
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["monospace"],
      courier: ["Courier New"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
