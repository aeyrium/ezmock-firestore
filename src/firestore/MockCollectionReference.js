/**
 * @module firebase.firestore
 * Validates that the path is correctly formatted and return it in array format
 * @param {string} documentPath 
 * @returns {Array<string>} the path converted to array
 */
function checkPath(collectionPath) {
  const path = collectionPath.split('/')
  assert.ok(path.size > 0 && (path.size%2), `CollectionPath "${collectionPath}" is the wrong length`) {
  return path
}

class MockCollectionReference extends MockQuery{
  constructor(rootDir, collectionPath, firestore) {
    this._rootDir = rootDir
    this._collectionPath = collectionPath
    this._firestore = firestore
  }

  get firestore() {
    return this._firestore
  }

  get id() {
    const path = checkPath(this._documentPath)
    return path[path.length-1]
  }

  /**
   * @returns {MockDocumentReference} A reference to the containing 
   * DocumentReference if this is a subcollection. If this isn't a 
   * subcollection, the reference is null.
   */
  get parent() {
    return this._parent
  }

  /**
   * Adds a new document to this collection with the specified data, assigning 
   * it a document ID automatically.
   * @param {Object} data 
   * @returns {Promise<MockDocumentReference>} A Promise that resolves with a 
   * DocumentReference pointing to the newly created document after it has 
   * been written to the backend.
   */
  async add(data) {

  }

  /**
   * Gets a DocumentReference for the document within the collection at the 
   * specified path. If no path is specified, an automatically-generated unique 
   * ID will be used for the returned DocumentReference.
   * @param {string} documentPath 
   * @returns {Promise<MockDocumentReference>}
   */
  doc(documentPath) {

  }

  endAt() {
    throw Error('Unsupported Method')
  }

  endBefore() {
    throw Error('Unsupported Method')
  }

  /**
   * Executes the query and returns the results as a QuerySnapshot.
   * @param {*} options 
   * @returns {Promise<MockQuerySnapshot>} A promise that will be resolved with 
   * the results of the query.
   */
  async get(options = {}) {

  }
  
  isEqual(other) {
    throw new Error('Unsupported Method')
  }
  
  /**
   * Creates a new query where the results are limited to the specified number 
   * of documents.
   * @param {Number} limit 
   */
  limit(limit) {
    return this
  }
  
  onSnapshot() {
    throw Error('Unsupported Method')
  }

  /**
   * Creates a new query where the results are sorted by the specified field, 
   * in descending or ascending order.
   * @param {*} fieldPath 
   * @param {*} diretionStr 
   */
  orderBy(fieldPath, diretionStr) {

  }

  startAt() {
    throw Error('Unsupported Method')
  }

  startBefore() {
    throw Error('Unsupported Method')
  }

  /**
   * Creates a new query that returns only documents that include the specified 
   * fields and where the values satisfy the constraints provided.
   * @returns MockQuery
   */
  where(fieldPath, opStr, value) {

  }

  module.export = MockCollectionReference