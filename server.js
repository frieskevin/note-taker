
const express = require('express');
const notes = require('./Develop/db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/develop/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
});

app.listen(PORT, () => {
    console.log(`API server on port ${PORT}`);
});