/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        mmsPry3: "#058B94",
        mmsBlack1: "#141414",
        mmsBlack2: "#333333",
        mmsBlack3: "#4D4D4D",
        mmsPry10: "#E6FDFE",
        mmsBlack5: "#808080",
        green11: "#F7FEFF",
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          hoverOpacity: 0.04,
          selected: "#D99BFF",
          selectedOpacity: 0.08,
          disabled: "#CBCDCF",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
          disabledOpacity: 0.38,
          focus: "rgba(0, 0, 0, 0.12)",
          focusOpacity: 0.12,
          activatedOpacity: 0.12,
          backdrop: "rgba(52, 64, 84, 0.6)",
          backdropFilter: "blur(16px)"
        }
      }
    }
  },
  plugins: [require("daisyui")]
};
