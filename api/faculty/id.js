// /api/faculty/[id].js
import clientPromise from '../../../db.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const facultyId = req.query.id;

  if (!facultyId) {
    return res.status(400).json({ error: 'Missing faculty ID' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('faculty_db'); // your DB name
    const faculty = await db.collection('faculty').findOne({ _id: new ObjectId(facultyId) });

    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
