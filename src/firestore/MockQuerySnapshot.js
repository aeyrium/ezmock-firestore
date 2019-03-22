const MockDocumentSnapshot = require('./MockDocumentSnapshot');

class MockQuerySnapshot {
  constructor(docs) {
    this._docs = docs;
    this._docsSnaps = [];

    if (Array.isArray(this._docs)) {
      this._docsSnaps = this._docs.map(doc => new MockDocumentSnapshot(doc.__id, doc));
    }
  }

  get docs() {
    return this._docsSnaps;
  }

  get size() {
    return this._docsSnaps.length;
  }
  
  get empty() {
    return this._docsSnaps.length === 0;
  }

  forEach(callback) {
    this._docsSnaps.forEach(callback);
  }
}

module.exports = MockQuerySnapshot;
