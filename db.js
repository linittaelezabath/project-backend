// db.js
const { MongoClient } = require('mongodb');

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

module.exports = clientPromise;
