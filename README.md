# ezmock-firestore
The `ezmock-firestore` is a lightweight implementation of the Firebase/Firestore apis designed to run locally and store data on the filesystem wihtout any external dependencies or connections to a real Firestore database.  Its primary purpose is to support Unit testing of libraries that depend on Firestore.

## Getting Started

```
const firebase = require('ezmock-firebase)

firebase.initializeApp({
  // only one parameter, the location where the data files should be stored
  rootDir: process.cwd() 
})

// Get a Firestore instance
const db = firebase.firestore()
```

## Saving Data 
Once you have an instance of `firestore`, it is used exactly the same way the official api is designed to be used with the sole exception that all data is store locally on the file system as JSON files.

For example, assume you executed the following :

```
const db = firebase.firestore()

await db.collection('Address').add({
  street1: '2480 Precision Dr'
  street2: 'STE K',
  city: 'Minden',
  state: 'NV',
  zipcode: '89423'
})
```

The result would be the following file create at the `rootDir` specified in the `initializeApp()` step...

```
{rootDir}
  |
  +- /Address
    |
    +- 648239c4-7576-424d-8c7a-7644ffcbaf0e.json
```

Alternatively we might accomplish something similar using the `doc()` method instead of the `collection()` method ...

```
const db = firebase.firestore()

await db.doc('Address/MyOffice').set({
  street1: '2480 Precision Dr'
  street2: 'STE K',
  city: 'Minden',
  state: 'NV',
  zipcode: '89423'
})
```

would add another file and make the directory under `rootDir` look like this ...

```
{rootDir}
  |
  +- /Address
    |
    +- 648239c4-7576-424d-8c7a-7644ffcbaf0e.json
    |
    +- MyOffice.json
```

Subcollection are also supported.  For example, lets assume the following use of the api ...

```
const db = firebase.firestore()

await db.collection('Address/648239c4-7576-424d-8c7a-7644ffcbaf0e/Employee/12345').add({
  name: 'Bob Jones',
  title: 'Manager'
})
```

would create a subfolder under `/Address` like this ...

```
{rootDir}
  |
  +- /Address
    |
    +- 648239c4-7576-424d-8c7a-7644ffcbaf0e.json
    |
    +- /648239c4-7576-424d-8c7a-7644ffcbaf0e
    |  |
    |  +- 12345.json
    |
    +- MyOffice.json
```

## Creating Test Data
It is possible to create data entirely through the API dynamically wtihin your Unit Tests ... or you can simply create the filestructure manually on the file system.  Both have their advantages.





