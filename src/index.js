const MockFirestore = require('./firestore/MockFirestore')

let _rootDir

function firestore() {
  firestore.Timestamp = require('./firestore/MockTimestamp')
  return new MockFirestore(_rootDir)
}

/**
 * @module firebase
 */
class MockFirebase {
  constructor() {
    this.firestore = firestore
  }

  initializeApp(options = {}, name = "default") {
    _rootDir = (options.rootDir) ? `${options.rootDir}/data` : `${process.cwd}/data`
    if (fs.existsSync(_rootDir) == false) {
      fs.mkdirSync(_rootDir, { recursive: true })
    }
  }
}

module.exports = new MockFirebase()
