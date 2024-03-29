const uuid = require('uuid');

const applyWhere = (data, condition, compareValue) => {
  switch(condition) {
    case '<':
      return data < compareValue;
    case '<=':
      return data <= compareValue;
    case '==':
      return data === compareValue;
    case '>=':
      return data >= compareValue;
    case '>':
      return data > compareValue;
    case 'array-contains':
      return data.indexOf(compareValue) !== -1;
  }
}

const getSortOrder = (sort) => {
  switch(sort) {
    case 'asc':
      return 1;
    case 'desc':
      return -1;
  }
}

const applySort = (sortOrder, property) => (obj1, obj2) => {
  const val1 = obj1[property];
  const val2 = obj2[property];

  return sortOrder * ((val1 > val2) - (val2 > val1));
}

sortFn = (obj1, obj2) => {
  const val1 = accessorHandler(obj1);
  const val2 = accessorHandler(obj2);

  return sortOrder * ((val1 > val2) - (val2 > val1));
};

/**
 * Stores the mock data as an array pointed to an attribute by model
 * {
 *  'Aircraft': [],
 *  'Car': [],
 *  'Car/00001/engine': [] // subcollection
 * }
 */
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

  /**
   * 
   * @param {*} model the model to retrieve
   * @param {*} conditions an array of conditions with the following structure
   * {
   *  fieldPath: field,
   *  opStr: operator,
   *  value: value to compare,
   * }
   * @param {*} orderBy indicates the sort condition
   * {
   *  fieldPath: field to sort,
   *  directionStr: sort order (asc|desc),
   * }
   */
  filter(model, conditions = [], orderBy = []) {
    const collection = this.collection[model];
    let results = [];

    if (!Array.isArray(collection)) {
      return [];
    }

    if (conditions.length === 0) {
      results = collection;
    }

    results = collection.filter((item) => {
      let fulfillsCondition = true;

      conditions.forEach((condition) => {
        if (fulfillsCondition === true) {
          fulfillsCondition = applyWhere(item[condition.fieldPath], condition.opStr, condition.value);
        }
      });

      return fulfillsCondition;
    });

    // TODO: support multiple orders
    if (Array.isArray(orderBy) && orderBy.length > 0) {
      const sortOrder = getSortOrder(orderBy[0].directionStr);
      const toSort = applySort(sortOrder, orderBy[0].fieldPath);
      results.sort(toSort);
    }

    return results;
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

    const index = collection.findIndex(item => item.__id === id);

    if (index > -1) {
      if (merge) {
        this.collection[model][index] = Object.assign(this.collection[model][index], value);
      } else {
        this.collection[model][index] = Object.assign({ __id: this.collection[model][index].__id}, value);
      }
    }

    return this.collection[model][index];
  }

  delete(id, model) {
    const collection = this.collection[model];

    if (!Array.isArray(collection)) {
      return null;
    }

    const index = collection.findIndex(item => item.__id === id);

    if (index !== -1) {
      collection.splice(index, 1);
    }
  }

  flush(model) {
    if (model) {
      this.collection[model] = [];
    } else {
      this.collection = {};
    }
  }

  preload(model, data = []) {
    if (!Array.isArray(data)) {
      return;
    }

    const dataWithIds = data.map((item) => {
      const propsToAdd = {};

      if (!item.__id) {
        propsToAdd.__id = uuid.v4();
      }

      return Object.assign({}, item, propsToAdd);
    });

    this.collection[model] = dataWithIds;
  }
}

module.exports = new DataSource();
