import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let db;

// Ensure DB connection is reused across calls
async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("faculty_db");
  }
  return db;
}

// API handler
export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const db = await connectDB();
    const data = await db
      .collection("faculty")
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
