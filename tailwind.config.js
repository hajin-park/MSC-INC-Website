/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0a2239', // dark blue
        'secondary': '#008080', // teal
        'background': '#f5f5f5', // light gray for background
        'navbar-light': '#1d1b27', // dark blue for navbar
        'footer-light': '#1d1b27', // dark blue for footer
        'navbar-dark': '#1d1b27', // dark blue for navbar
        'footer-dark': '#1d1b27', // dark blue for footer
        'text-primary': '#0a2239', // dark blue for primary text
        'text-secondary': '#008080', // teal for secondary text
        'text-light': '#ffffff', // white for light text
        'link': '#008080', // teal for links
        'button': '#0a2239', // dark blue for buttons
        'button-text': '#ffffff', // white for button text
        'border': '#0a2239', // dark blue for borders
        'card': '#ffffff', // white for cards
        'card-text': '#0a2239', // dark blue for card text
        'alert': '#ff0000', // red for alerts
        'success': '#008000', // green for success messages
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '144': '36rem',
        '192': '48rem',
        '236': '60rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

