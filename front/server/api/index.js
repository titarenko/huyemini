const fs = require('fs')
const { Router } = require('express')

const router = module.exports = Router()

const features = fs.readdirSync(`${__dirname}`).filter(it => it !== 'index.js').map(it => getModuleName(it))

features.forEach(k => {
  router.use(`/${k}`, require(`./${k}`))
})

function getModuleName (path) {
  return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
}