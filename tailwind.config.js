/** @type {import('tailwindcss').Config} */

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
      spacing: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
        '256': '64rem',
        '272': '68rem',
        '288': '72rem',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

