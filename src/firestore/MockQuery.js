/**
 * @module firebase.firestore
 */
class MockQuery {

  constructor(firestore) {
    this._firestore = firestore
  }


  get firestore() {
    return this._firestore
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
    return this
  }
}