/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'lightBlue': '#00b2bf',
      'LighterBlue': '#40e2dd',
      'black': '#18191f',
      'white' :'#f2f2f2',
      'greenishBlue': '#9bdad9'
      },
  },
  plugins: [ require('flowbite/plugin')],
}

