const atImport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');

module.exports = {
  plugins: [
    atImport,
    autoprefixer,
    customProperties({preserve: false}),
  ]
};