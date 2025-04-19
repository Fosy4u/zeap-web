import * as flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      colors: {
        primary: "#133522",
        secondary: "#D5B07B",
        "sky-blue": "#6f51ff",
        gray: "#eeeeee",
        grey7: "#EDEFF4",
        grey6: "#E0E2E8",
        grey5: "#A8ACB8",
        baseGreen: "#133522",
        lightGreen: "#D5F4E3",
        lightGold: "#FFFAF2",
        lightWarning: "#FDF7EA",
        lightInfo: "#E3ECFF",
        lightSuccess: "#D5F4E3",
        lightDanger: "#FFEAEA",
        gold: "#D5B07B",
        midGold: "#C7A16E",
        success: '#219653',
        danger: '#C53A30',
        warning: '#E4A01C',
        info: '#3461B9',
      },
    },
  },
  plugins: [
    flowbite.plugin()({
      charts: true,
    }),
  ],
};
