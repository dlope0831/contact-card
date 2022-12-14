import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
  // We are creating a new database named 'contact_db' which will be using version 1 of the database.
  openDB('contact_db', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    }
  })
}
// export a function we will use to GET to the database
export const getDb = async () => {
  console.log('GET from the database')
//create a connection to the IndexedDB database and the version we want to use
const contactDb = await openDB('contact_db', 1);
//create a new transcation and specify the store and data privileges 
const tx = contactDb.transaction('contacts', 'readonly');
//open up the desired object store
const store = tx.objectStore('contacts');
// Use the .getAll() method to get all data in the database
const request = store.getAll();
//get confirmation of the requesst
const result = await request;
console.log('result.value', result);
return result;
};
// Export a function we will use to POST to the database.
export const postDb = async (name, email, phone, profile) => {
  console.log('POST to the database');

  // Create a connection to the database and specify the version we want to use.
  const contactDb = await openDB('contact_db', 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction('contacts', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('contacts');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ name: name, email: email, phone: phone, profile: profile });

  // Get confirmation of the request.
  const result = await request;
  console.log('???? - data saved to the database', result);
}

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  // create a connection to the IndexedDB database and the version we want to us
  const contactDb = await openDB('contact_db', 1);

  //create a new transaction and specify the store and data privleges
  const tx = contactDb.transaction('contacts', 'rewrite');

  //use the .delete() method to get all data in the database
  const request = store.delete(id);

  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

export const editDb = async (id, name, email, phone, profile) => {
  console.log('EDIT from the database', id);

  // create a connection to the IndexedDB database and the version we want to us
  const contactDb = await openDB('contact_db', 1);

  //create a new transaction and specify the store and data privleges
  const tx = contactDb.transaction('contacts', 'rewrite');

  //use the .delete() method to get all data in the database
  const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });

  // get confirmation of the request
  const result = await request;
  console.log('???? - data saved to the database', result);
}