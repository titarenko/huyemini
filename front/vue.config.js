const configAPI = require('./server/config')

module.exports = {
  configureWebpack: config => {
    config.entry.app = `${__dirname}/index.js`
  },
  devServer: {
    before: configAPI
  }
}