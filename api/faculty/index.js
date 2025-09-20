import clientPromise from '../../../db.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('faculty_db');
    const facultyList = await db.collection('faculty').find({}).toArray();
    res.status(200).json(facultyList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
