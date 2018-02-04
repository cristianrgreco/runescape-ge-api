const fs = require('fs')
const path = require('path')

const getFixture = fixtureName => {
  return fs.readFileSync(path.join(__dirname, fixtureName))
}

module.exports = {getFixture}
