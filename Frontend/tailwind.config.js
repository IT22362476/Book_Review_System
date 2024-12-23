/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Make sure to include JSX/TSX files if needed
  theme: {
    extend: {
      fontFamily: {
        // Custom fonts
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
