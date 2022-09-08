module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "85vh": "85vh"
      },
      colors: {
        'primary': "#B9D7F9",
        "secondary": "#E4B9F9",
        "background": "#170F23",
        "backgroundLight": "#231B2E",
        "imageLight": "#FF00E5"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
}
