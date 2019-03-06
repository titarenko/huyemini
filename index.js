const tap = require('tap')

function shot (name, callback) {
  tap.test(name, async function () {
    const image = await callback()
    const reference = await findReference(name)
    if (reference) {
      const difference = await getDifference(reference, image)
      if (difference) {
        await saveDifference(name, difference)
        throw new Error(`${name}: shot does not match reference`)
      }
    }
  })
}

function findReference () {

}

function getDifference () {

}

function saveDifference () {

}
