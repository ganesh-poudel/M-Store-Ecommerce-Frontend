/** @type {import('tailwindcss').Config} */
import daisyui from './node_modules/daisyui';
module.exports = {
  content: ['./src/**/*.{jsx,js,ts,tsx}'],

  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
