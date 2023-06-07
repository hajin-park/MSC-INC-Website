/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-text': '#0e0907',
        'custom-background': '#f0e6e0',
        'custom-primary': '#80c29a',
        'custom-secondary': '#e6d6cb',
        'custom-accent': '#9a80c2',
      },
    },
  },
  plugins: [],
}

