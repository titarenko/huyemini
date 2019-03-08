import glob from 'glob'

import Config from './Config'

function run () {
  const config = Config.getCurrent()
  const files = glob.sync(config.shotFiles)
  files.forEach(f => require(f))
}

run()
