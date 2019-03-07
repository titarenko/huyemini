module.exports = {
  configureWebpack: config => {
    config.entry.app = `${__dirname}/index.js`
  },
}
