const MockFirestore = require('./firestore/MockFirestore')

let _rootDir

function firestore() {
  return new MockFirestore(_rootDir)
}

/**
 * @module firebase
 */
class MockFirebase {
  constructor() {
    firestore.Timestamp = require('./firestore/MockTimestamp')
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
