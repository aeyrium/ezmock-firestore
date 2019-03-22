const assert = require('assert');
const MockDocumentSnapshot = require('./MockDocumentSnapshot');
const DataSource = require('./DataSource');

/**
 * @module firebase.firestore
 * Validates that the path is correctly formatted and return it in array format
 * @param {string} documentPath 
 * @returns {Array<string>} the path converted to array
 */
function checkPath(documentPath) {
  const path = documentPath.split('/')
  // assert.ok(path.size > 0 && !(path.size%2), `DocumentPath "${documentPath}" is the wrong length`)
  if (path.size > 0 && !(path.size%2)) {
    throw new Error(`DocumentPath "${documentPath}" is the wrong length`);
  }
  return path;
}

class MockDocumentReference {
  /**
   * 
   * @param {string} rootDir 
   * @param {string} documentPath 
   */
  constructor(documentPath, firestore) {
    this._documentPath = documentPath;
    this._firestore = firestore;
    this._documentId = null;
    this._collection = null;

    const data = this._documentPath.split('/');

    if (Array.isArray(data)) {
      this._collection = data[0];

      if (data.length > 1) {
        this._documentId = data[1];
      }
    }
  }

  /**
   * @returns {string} The document's identifier within its collection.
   */
  get id() {
    return this._documentId;
  }

  /**
   * @returns {MockCollectionReference} The Collection this 
   * DocumentReference belongs to
   */
  get parent() {
    return null;
  }
  
  /**
   * @returns {string} A string representing the path of the referenced 
   * document, relative to the root of the database.
   */
  get path() {
    return this._documentPath;
  }

  collection(collectionPath) {
    return new MockCollectionReference(this._rootDir, `${this.path}/${collectionPath}`, this._firestore)
  }

  async delete() {
    return Promise.resolve();
  }

  /**
   * Executes the query and returns the results as a QuerySnapshot.
   * @param {Object} options 
   * @returns {MockQuerySnapshot}
   */
  async get(options) {
    const data = DataSource.find(this._collection, this._documentId);
    return new MockDocumentSnapshot(this._documentId, data);
  }

  onSnapshot() {
    throw Error('Unsupported Method');
  }

  async set(data, options = {}) {
    const { merge } = options;
    const currentDoc = DataSource.find(this._collection, this._documentId);

    if (currentDoc) {
      DataSource.update(this._documentId,  this._collection, data, merge);
    } else {
      const id = DataSource.add(this._collection, data, this._documentId);
    }
  }

  async update(data) {
    DataSource.update(this._documentId, this._collection, data, true);
  }
}

module.exports = MockDocumentReference
