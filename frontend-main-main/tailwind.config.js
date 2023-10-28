/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

// export const content = withMT([
//   "./src/**/*.{js,jsx,ts,tsx}",
// ];
export const theme = {
  extend: {},
};
export const plugins = [];

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});

