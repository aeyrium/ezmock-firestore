const uuid = require('uuid');

class DataSource {
  constructor() {
    this.collection = {};
  }

  find(model, id) {
    const collection = this.collection[model];

    if (Array.isArray(collection)) {
      return collection.find(item => item.__id === id);
    }

    return null;
  }

  filter(model, conditions = []) {
    const collection = this.collection[model];

    if (!Array.isArray(collection)) {
      return [];
    }

    if (conditions.length === 0) {
      return collection;
    }

    return [];
  }

  add(model, value, customId) {
    let toSaveId = customId;

    if (!toSaveId) {
      toSaveId = uuid.v4();
    }

    if (!Array.isArray(this.collection[model])) {
      this.collection[model] = [];
    }

    const collection = this.collection[model];

    value.__id = toSaveId;

    collection.push(value);

    return toSaveId;
  }

  update(id, model, value, merge) {
    const collection = this.collection[model];

    if (!Array.isArray(collection)) {
      return null; // or throw error?
    }

    let document = collection.find(item => item.__id = id);

    if (merge) {
      document = Object.assign(document, value);
    } else {
      document = value;
    }

    return document;
  }
}

module.exports = new DataSource();
