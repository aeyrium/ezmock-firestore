const firebase = require('../src')
firebase.initializeApp({
  rootDir: __dirname
})

it('should add a document', async () => {
  await firebase.firestore().collection('Aircraft').add({
    tailNumber: 'BBB222',
    make: 'Bell',
    model: '322',
  });
});

it('should add a document with set', async () => {
  await firebase.firestore().doc('Aircraft/aircraft01').set({
    tailNumber: 'AAA111',
    make: 'Cirrus',
    model: 'NT22',
  });
});

it('should update a document with update', async () => {
  await firebase.firestore().doc('Aircraft/aircraft01').update({
    engineCount: 1,
  });
});

it('should update a document with set', async () => {
  await firebase.firestore().doc('Aircraft/aircraft01').set({
    model: 'ST-22',
  }, { merge: true });
});

it('should get a single document', async () => {
  const snap = await firebase.firestore().doc('Aircraft/aircraft01').get();

  console.log('exists', snap.exists);
  console.log('id', snap.id);
  console.log('data', snap.data());
});

it('should query a collection', async () => {
  const querySnap = await firebase.firestore().collection('Aircraft').get();

  console.log('empty', querySnap.empty);
  console.log('size', querySnap.size);

  querySnap.docs.forEach((snap) => {
    console.log('id', snap.id);
    console.log('data', snap.data());
  });
});

it('should query a collection with where', () => {

});

it('should sort a collection', () => {

});

it('should query a subcollection', () => {

});
