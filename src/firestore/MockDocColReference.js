const DataSource = require('./DataSource');
const MockQuerySnapshot = require('./MockQuerySnapshot');
const MockDocumentSnapshot = require('./MockDocumentSnapshot');

class MockCollectionReference {
  constructor(collectionPath, firestore) {
    this._collectionPath = collectionPath;
    this._firestore = firestore;
    this._where = []; // Array of filters
    this._orderBy = []; // Array of sorting
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
    const docs = DataSource.filter(this._collectionPath, this._where, this._orderBy);

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
    return this;
  }
  
  onSnapshot() {
    throw Error('Unsupported Method')
  }

  /**
   * Creates a new query where the results are sorted by the specified field, 
   * in descending or ascending order.
   * @param {*} fieldPath 
   * @param {*} directionStr 
   */
  orderBy(fieldPath, directionStr) {
    this._orderBy.push({
      fieldPath,
      directionStr,
    });

    return this;
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

    return this;
  }
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

    const index = this._documentPath.lastIndexOf('/');

    if (index !== -1) {
      this._collection = this._documentPath.substr(0, index);
      this._documentId = this._documentPath.substr(index + 1);
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
    const path = `${this._documentPath}/${collectionPath}`;
    return new MockCollectionReference(path, this._firestore);
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
      DataSource.add(this._collection, data, this._documentId);
    }
  }

  async update(data) {
    DataSource.update(this._documentId, this._collection, data, true);
  }
}

module.exports = {
  MockCollectionReference,
  MockDocumentReference,
};
