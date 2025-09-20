const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // your MySQL username
    password: 'Appu67..', // your MySQL password
    database: 'faculty_db'
});

db.connect(err => {
    if (err) {
        console.error('DB connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// GET faculty basic info by ID
app.get('/faculty/:id', (req, res) => {
    const facultyId = req.params.id;
    const query = 'SELECT * FROM faculty WHERE id = ?';
    db.query(query, [facultyId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// GET qualifications
app.get('/faculty/:id/qualifications', (req, res) => {
    const facultyId = req.params.id;
    const query = 'SELECT qualification FROM qualifications WHERE faculty_id = ?';
    db.query(query, [facultyId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET research interests
app.get('/faculty/:id/research', (req, res) => {
    const facultyId = req.params.id;
    const query = 'SELECT interest FROM research WHERE faculty_id = ?';
    db.query(query, [facultyId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET experience
app.get('/faculty/:id/experience', (req, res) => {
    const facultyId = req.params.id;
    const query = 'SELECT detail FROM experience WHERE faculty_id = ?';
    db.query(query, [facultyId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET publications
app.get('/faculty/:id/publications', (req, res) => {
    const facultyId = req.params.id;
    const query = 'SELECT publication FROM publications WHERE faculty_id = ?';
    db.query(query, [facultyId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
