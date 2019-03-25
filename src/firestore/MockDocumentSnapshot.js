class MockDocumentSnapshot {
  constructor(id, data) {
    this._id = id;
    this._data = data;
  }

  get id() {
    return this._id;
  }

  get exists() {
    return !!this._data;
  }
  
  get ref() {
    return null;
  }

  data() {
    return this._data;
  }
}

module.exports = MockDocumentSnapshot;
