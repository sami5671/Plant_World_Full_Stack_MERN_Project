/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/rizzui/dist/**/*.{js,ts,jsx,tsx}", // Ensure Rizz UI components are scanned
  ],
  theme: {
    extend: {
      fontFamily: {
        rancho: ["Rancho", "serif"], // Correctly define custom font family
      },
      colors: {
        primary: {
          lighter: colors.blue[200],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700],
          foreground: colors.white,
          backgroundColor: "#ebf7f6",
          dashboardPrimaryColor: "#62825D",
          dashboardPrimaryTextColor: colors.lime[700],
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
