const assert = require('assert').strict;

/**
 * @module firebase.firestore
 * Validates that the path is correctly formatted and return it in array format
 * @param {string} documentPath 
 * @returns {Array<string>} the path converted to array
 */
function checkPath(documentPath) {
  const path = documentPath.split('/')
  assert.ok(path.size > 0 && !(path.size%2), `DocumentPath "${documentPath}" is the wrong length`) {
  return path
}

class MockDocumentReference {
  /**
   * 
   * @param {string} rootDir 
   * @param {string} documentPath 
   */
  constructor(rootDir, documentPath, firestore) {
    this._rootDir = rootDir
    this._documentPath = documentPath
    this._firestore = firestore
  }

  /**
   * @returns {string} The document's identifier within its collection.
   */
  get id() {
    const path = checkPath(this._documentPath)
    return path[path.length-1]
  }

  /**
   * @returns {MockCollectionReference} The Collection this 
   * DocumentReference belongs to
   */
  get parent() {
    const path = checkPath(this._documentPath).slice(0, -1)
    return new MockCollectionReference(this._rootDir, path.join('/'), this._firestore)
  }
  
  /**
   * @returns {string} A string representing the path of the referenced 
   * document, relative to the root of the database.
   */
  get path() {
    return this._documentPath
  }

  collection(collectionPath) {
    return new MockCollectionReference(this._rootDir, `${this.path}/${collectionPath}`, this._firestore)
  }

  async delete() {
    return Promise.resolve()
  }

  /**
   * Executes the query and returns the results as a QuerySnapshot.
   * @param {Object} options 
   * @returns {MockQuerySnapshot}
   */
  async get(options) {

  }

  onSnapshot() {
    throw Error('Unsupported Method')
  }

  async set(data, options) {

  }

  async update(...var_args) {

  }
}

module.export = MockDocumentReference