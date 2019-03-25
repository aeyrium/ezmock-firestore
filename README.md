# ezmock-firestore
The `ezmock-firestore` is a lightweight implementation of the Firebase/Firestore apis designed to run locally and store data in memory without any external dependencies or connections to a real Firestore database.  Its primary purpose is to support Unit testing of libraries that depend on Firestore.

## Getting Started

```
const firebase = require('ezmock-firebase);

// Get a Firestore instance
const db = firebase.firestore();
```

## Prepopulating Data for Tests
If you want to preload data for your tests you use `preload` in the `before` hook of your test suite. The first parameter is the model to load and the second one is the data.

```
const firebase = require('ezmock-firebase);
const db = firebase.firestore();
const data = []; // an array of people that can be loaded from a file as well.

db.preload('People', data);
```

Works with subcollections as well
```
const firebase = require('ezmock-firebase);
const db = firebase.firestore();
const cardData = []; // an array of card data for that specific subcollection.

db.preload('People/id101/cards', cardData)
```

Also you simply do a firebase `add` or `set`

```
const firebase = require('ezmock-firebase);
const db = firebase.firestore()

await db.collection('Address').add({
  street1: '2480 Precision Dr'
  street2: 'STE K',
  city: 'Minden',
  state: 'NV',
  zipcode: '89423'
})
```

## Clear Data 
To clear data for all of the models, call the `flush` method. Remember the data you add and update in the collections remains until the test suite ends or you call `flush` explicitly.

```
const firebase = require('ezmock-firebase);
const db = firebase.firestore();

db.flush();
```

If you want to clear a  specific model, you can pass it as a parameter

```
db.flush('People');
```

Works with subcollections as well

```
db.flush('People/id0101/cards');
```
