// /api/faculty/[id].js
const clientPromise = require('../../db');
const { ObjectId } = require('mongodb');

export default async function handler(req, res) {
  const facultyId = req.query.id;

  try {
    const client = await clientPromise;
    const db = client.db('faculty_db');
    const data = await db.collection('faculty').findOne({ _id: new ObjectId(facultyId) });
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
}
