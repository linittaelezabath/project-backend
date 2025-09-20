const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI; // set in Vercel or .env
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('DB connection error:', err);
    }
}
connectDB();

const db = client.db('faculty_db');

// Example: get faculty info by ID
app.get('/faculty/:id', async (req, res) => {
    const facultyId = req.params.id;
    try {
        const data = await db.collection('faculty').findOne({ _id: new ObjectId(facultyId) });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
