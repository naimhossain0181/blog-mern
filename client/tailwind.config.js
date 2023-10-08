/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'Oswald': ['Oswald'],
      'Croissant': ['Croissant One', 'cursive'],
      'bebas':['Bebas Neue' ,'sans-serif']
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

