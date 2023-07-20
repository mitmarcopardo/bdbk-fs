/* eslint-disable no-unused-vars */

import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  // new user
  let name = 'user' + Math.floor(Math.random()*10000);
  let email = name + '@mit.edu';

  const db = client.db(dbName);
  const collection = db.collection('testCreation');
  const doc = {name, email};
  const insertion = await collection.insertOne(doc, {w:1})
  console.log('Inserted documents =>', insertion);

  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  // close session
  const eventName2 = "serverClosed";
  client.on(eventName2, event => {
    console.log(`.....received ${eventName2}: ${JSON.stringify(event, null, 2)}`);
  });

return 'done.'

}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());