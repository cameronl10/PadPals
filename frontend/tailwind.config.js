/** @type {import('tailwindcss').Config} */
module.exports = {
  // need to update this to include the custom directory
  content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: ["nativewind/babel"],
}

