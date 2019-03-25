const firebase = require('../src');
const peopleData = require('./data/people');

beforeAll(() => {
  firebase.firestore().preload('People', peopleData);
});

it('should query a collection', async () => {
  const querySnap = await firebase.firestore().collection('People').get();

  expect(querySnap.empty).toEqual(false);
  expect(querySnap.size).toEqual(4);
});
