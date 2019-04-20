const firebase = require('../src');

it('should return Timestamp', () => {
  const tstamp = firebase.firestore.Timestamp
  expect(tstamp).not.toBeNull()
})

it('should add a document', async () => {
  const docRef = await firebase.firestore().collection('Aircraft').add({
    tailNumber: 'BBB222',
    make: 'Bell',
    model: '322',
  });

  expect(docRef.id).not.toBeNull();
});

it('should add a document with set', async () => {
  let aircraftSnap = await firebase.firestore().doc('Aircraft/aircraft01').get();
  expect(aircraftSnap.exists).toEqual(false);

  await firebase.firestore().doc('Aircraft/aircraft01').set({
    tailNumber: 'AAA111',
    make: 'Cirrus',
    model: 'NT22',
    engineCount: 3,
  });

  aircraftSnap = await firebase.firestore().doc('Aircraft/aircraft01').get();
  expect(aircraftSnap.exists).toEqual(true);
});

it('should get a single document', async () => {
  const snap = await firebase.firestore().doc('Aircraft/aircraft01').get();

  expect(snap.exists).toEqual(true);
  expect(snap.id).toEqual('aircraft01');
  expect(snap.data().tailNumber).toEqual('AAA111');
  expect(snap.data().make).toEqual('Cirrus');
  expect(snap.data().model).toEqual('NT22');
  expect(snap.data().engineCount).toEqual(3);
});

it('should update a document with update', async () => {
  let aircraftSnap = await firebase.firestore().doc('Aircraft/aircraft01').get();
  expect(aircraftSnap.data().engineCount).toEqual(3);

  await firebase.firestore().doc('Aircraft/aircraft01').update({
    engineCount: 1,
  });

  aircraftSnap = await firebase.firestore().doc('Aircraft/aircraft01').get();
  expect(aircraftSnap.data().engineCount).toEqual(1);
});

it('should update a document with set', async () => {
  let aircraftSnap = await firebase.firestore().doc('Aircraft/aircraft01').get();

  expect(aircraftSnap.data().model).toEqual('NT22');

  await firebase.firestore().doc('Aircraft/aircraft01').set({
    model: 'ST-22',
  }, { merge: true });

  aircraftSnap = await firebase.firestore().doc('Aircraft/aircraft01').get();
  expect(aircraftSnap.data().model).toEqual('ST-22');
  expect(aircraftSnap.data().tailNumber).toEqual('AAA111');
  expect(aircraftSnap.data().make).toEqual('Cirrus');
  expect(aircraftSnap.data().engineCount).toEqual(1);
});

it('should query a collection', async () => {
  const querySnap = await firebase.firestore().collection('Aircraft').get();

  expect(querySnap.empty).toEqual(false);
  expect(querySnap.size).toEqual(2);
});

it('should query a subcollection', async () => {
  let querySnap = await firebase.firestore().doc('Aircraft/aircraft01')
    .collection('trackers')
    .get();

  expect(querySnap.empty).toEqual(true);
  expect(querySnap.size).toEqual(0);

  await firebase.firestore()
    .doc('Aircraft/aircraft01')
    .collection('trackers')
    .add({
      name: 'Hobbs',
      template: 'hobbs'
    });

  querySnap = await firebase.firestore().doc('Aircraft/aircraft01')
    .collection('trackers')
    .get();

  expect(querySnap.empty).toEqual(false);
  expect(querySnap.size).toEqual(1);

  querySnap.docs.forEach((snap) => {
    expect(snap.id).not.toBeNull();
    expect(snap.data().name).toEqual('Hobbs');
    expect(snap.data().template).toEqual('hobbs');
  });
});

it('should query a collection with where', async () => {
  firebase.firestore().flush(); // clear all data

  await firebase.firestore().collection('Aircraft').add({
    tailNumber: 'AAA111',
    make: 'Bell',
    model: '322',
  });
  await firebase.firestore().collection('Aircraft').add({
    tailNumber: 'BBB222',
    make: 'Bell',
    model: '555',
  });
  await firebase.firestore().collection('Aircraft').add({
    tailNumber: 'CCC333',
    make: 'Cirrus',
    model: 'ST22',
  });
  await firebase.firestore().collection('Aircraft').add({
    tailNumber: 'DDD444',
    make: 'Cirrus',
    model: 'LP2',
  });

  let querySnap = await firebase.firestore().collection('Aircraft')
    .where('make', '==', 'Bell')
    .get();

  expect(querySnap.empty).toEqual(false);
  expect(querySnap.size).toEqual(2);

  querySnap = await firebase.firestore().collection('Aircraft')
    .where('make', '==', 'Bell')
    .where('model', '==', '555')
    .get();

  expect(querySnap.empty).toEqual(false);
  expect(querySnap.size).toEqual(1);

  querySnap = await firebase.firestore().collection('Aircraft')
    .where('make', '==', 'Bell')
    .where('model', '==', 'NOTVALID')
    .get();

  expect(querySnap.empty).toEqual(true);
  expect(querySnap.size).toEqual(0);
});

it('should sort a collection', async () => {
  let querySnap = await firebase.firestore().collection('Aircraft')
    .orderBy('model', 'asc')
    .get();

  expect(querySnap.docs[0].data().model).toEqual('322');
  expect(querySnap.docs[1].data().model).toEqual('555');
  expect(querySnap.docs[2].data().model).toEqual('LP2');
  expect(querySnap.docs[3].data().model).toEqual('ST22');

  querySnap = await firebase.firestore().collection('Aircraft')
    .orderBy('model', 'desc')
    .get();

  expect(querySnap.docs[0].data().model).toEqual('ST22');
  expect(querySnap.docs[1].data().model).toEqual('LP2');
  expect(querySnap.docs[2].data().model).toEqual('555');
  expect(querySnap.docs[3].data().model).toEqual('322');
});

it('should filter and sort a collection', async () => {
  const querySnap = await firebase.firestore().collection('Aircraft')
    .where('make', '==', 'Bell')
    .orderBy('tailNumber', 'desc')
    .get();

  expect(querySnap.empty).toEqual(false);
  expect(querySnap.size).toEqual(2);
  expect(querySnap.docs[0].data().tailNumber).toEqual('BBB222');
  expect(querySnap.docs[1].data().tailNumber).toEqual('AAA111');
});

it('should create a Timestamp instance from Date', () => {
  const tstamp = firebase.firestore.Timestamp.fromDate(new Date('2019-01-01T00:00:00Z'))
  expect(tstamp.seconds).toBe(1546300800)
  expect(tstamp.nanoseconds).toBe(0)
})

it('should save with a Timestamp property', async () => {
  const tstamp = firebase.firestore.Timestamp.fromDate(new Date('2019-01-01T00:00:00Z'))

  const docRef = await firebase.firestore().collection('Networth').add({
    name: 'Yo-Yo Ma',
    networth: 5000000,
    when: tstamp
  })

  const snap = await firebase.firestore().doc(docRef.path).get()

  expect(snap.exists).toEqual(true)
  expect(snap.id).toEqual(docRef.id)
  expect(snap.data().name).toEqual('Yo-Yo Ma')
  expect(snap.data().networth).toEqual(5000000)
  expect(snap.data().when.seconds).toEqual(tstamp.seconds)
  expect(snap.data().when.nanoseconds).toEqual(tstamp.nanoseconds)
})
