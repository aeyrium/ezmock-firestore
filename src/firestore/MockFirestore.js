const { MockDocumentReference, MockCollectionReference } = require('./MockDocColReference');
const DataSource = require('./DataSource');
const MockTimestamp = require('./MockTimestamp')

/**
 * @module firebase.firestore
 * @class MockFirestore
 */
module.exports = class MockFirestore {
  constructor(rootDir) {
    this._rootDir = rootDir
  }

  get app() {
    return null
  }
  /**
   * Gets a DocumentReference for the document within the collection at the 
   * specified path. If no path is specified, an automatically-generated unique 
   * ID will be used for the returned DocumentReference.
   * @param {string} documentPath A slash-separated path to a document.
   * @returns {Promise<MockDocumentReference>} Gets a DocumentReference instance 
   * that refers to the document at the specified path.
   */
  doc(documentPath) {
    return new MockDocumentReference(documentPath, this)
  }

  /**
   * Gets a CollectionReference instance that refers to the collection at the 
   * specified path.
   * @param {string} collectionPath A slash-separated path to a collection.
   * @returns {MockCollectionReference} ollectionReference instance that refers 
   * to the collection at the specified path.
   */
  collection(collectionPath) {
    return new MockCollectionReference(collectionPath, this)
  }

  /**
   * Creates a write batch, used for performing multiple writes as a single atomic operation
   * @returns {WriteBatch} A WriteBatch that can be used to atomically execute multiple writes.
   */
  batch() {
    throw new Error('Method not supported')
  }

  /**
   * Disables network usage for this instance. It can be re-enabled via 
   * enableNetwork(). While the network is disabled, any snapshot listeners or 
   * get() calls will return results from cache, and any write operations will 
   * be queued until the network is restored.
   */
  async disableNetwork() {
    console.log('MockFiretore unable to disableNetwork().  Not supported.')
    return Promise.resolve()
  }

  async enableNetwork() {
    console.log('MockFiretore unable to enableNetwork().  Not supported.')
    return Promise.resolve()
  }

  async enablePersistence(options) {

    return Promise.resolved(new Error('Method not supported'))
  }

  /**
   * Executes the given updateFunction and then attempts to commit the changes 
   * applied within the transaction. If any document read within the 
   * transaction has changed, Cloud Firestore retries the updateFunction. If it
   * fails to commit after 5 attempts, the transaction fails.
   * @param {function(<Transaction>)} updateFunction 
   */
  async runTransaction(updateFunction) {
    throw new Error('Method not supported')
  }

  async setLogLevel(logLevel) {
    /* Ignored */
  }

  settings(settings) {
    /* Ignored */
  }

  flush() {
    DataSource.flush();
  }

  preload(model, data) {
    DataSource.preload(model, data);
  }

  get Timestamp() {
    return MockTimestamp;
  }
}
