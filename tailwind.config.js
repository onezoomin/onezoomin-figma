module.exports = {
  purge: {
    enabled: true,
    content:[
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.tsx',
    './src/*.tsx',
  ]},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
