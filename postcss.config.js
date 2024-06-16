const atImport = require("postcss-import");
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    atImport,
    autoprefixer,
  ]
};