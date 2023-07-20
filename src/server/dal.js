/* eslint-disable no-unused-vars */
// Data Abstraction Layer [ DAL ] File
//import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('Database Online'))
    .catch( e => console.log(e)); 

async function main(){

    const client = new MongoClient(url);
    try{
        await client.connect();
        console.log('Client Connected');
        

    }catch (e) {
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error)

// connect to database
export async function createUser( name, email, password ){
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('Database Online'))
    .catch( e => console.log(e)); 
    const client = new MongoClient(url);
    await client.connect();
    const doc = {name, email, password, balance : 0};
    const insertion = await client.db('myProject').collection('users').insertOne(doc, {w:1});

    console.log(`New listing created with the follwoing id: ${insertion.insertedId}`)

    return insertion;

}

export async function all(){
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('Database Online'))
    .catch( e => console.log(e)); 
    const client = new MongoClient(url);
    await client.connect();
    const allUsers = await client.db('myProject').collection('users').find().toArray();


    if (allUsers){
        console.log(`All Users: ${allUsers}`);
    }else{
        console.log(`No existing users`);
    }

    return JSON.stringify(allUsers)
}