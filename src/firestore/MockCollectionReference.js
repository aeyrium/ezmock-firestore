const DataSource = require('./DataSource');
const MockDocumentReference = require('./MockDocumentReference');
const MockQuerySnapshot = require('./MockQuerySnapshot');

class MockCollectionReference {
  constructor(collectionPath, firestore) {
    this._collectionPath = collectionPath;
    this._firestore = firestore;
    this._where = []; // Array of filters
  }

  get firestore() {
    return this._firestore;
  }

  get id() {
    return null;
  }

  get parent() {
    return null;
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
    const autoId = DataSource.add(this._collectionPath, data);
    const path = `${this._collectionPath}/${autoId}`;
    
    return new MockDocumentReference(path);
  }

  /**
   * Gets a DocumentReference for the document within the collection at the 
   * specified path. If no path is specified, an automatically-generated unique 
   * ID will be used for the returned DocumentReference.
   * @param {string} documentPath 
   * @returns {Promise<MockDocumentReference>}
   */
  doc(documentPath) {
    const path = `${this._collectionPath}/${documentPath}`;
    return new MockDocumentReference(path);
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
    // TOOD: use this._where options!
    const docs = DataSource.filter(this._collectionPath, this._where);

    console.log('docs', docs);
    return new MockQuerySnapshot(docs);
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
    this._where.push({
      fieldPath,
      opStr,
      value,
    });
  }
}

module.exports = MockCollectionReference