/* eslint-disable */
require("dotenv").config();
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts');

module.exports = withFonts(withCSS(withSass({
  env: {
    URL_APP: process.env.URL_APP,
    URL_API: process.env.URL_API,
    DEVELOPMENT_URL_API: process.env.DEVELOPMENT_URL_API,
    DEVELOPMENT_URL_APP: process.env.DEVELOPMENT_URL_APP,
    PRODUCTION_URL_API: process.env.PRODUCTION_URL_API,
    PRODUCTION_URL_APP: process.env.PRODUCTION_URL_APP,
    PORT: process.env.PORT,
    PORT_API: process.env.PORT_API
  },
  enableSvg: true,
  webpack(config, options) {
    return config;
  }
}
))); 
