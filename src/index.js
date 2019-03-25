const MockFirestore = require('./firestore/MockFirestore')

/**
 * @module firebase
 */
class MockFirebase {
  constructor() {
  }

  initializeApp(options = {}, name = "default") {
    this._rootDir = (options.rootDir)? `${options.rootDir}/data` : `${process.cwd}/data`
    if (fs.existsSync(this._rootDir) == false) {
      fs.mkdirSync(this._rootDir, {recursive: true})
    }
  }

  /**
   * @returns {MockFirestore}
   */
  firestore() {
    return new MockFirestore(this._rootDir)
  }
}

module.exports = new MockFirebase()
