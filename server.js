//requirement declarations
const express = require('express');
const { notes } = require('./Develop/db/db.json');
const fs = require('fs');
const path = require('path');

//heroku port or port 3001
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('develop/public'));

//function to write new notes to notes array json
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '/develop/db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

//gets the notes html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

//gets the notes api data
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//adds to the notes api data
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes)
    res.json(note);
});

//returns the index.html page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './Develop/public/index.html'));
// });

//wildcard request that just returns anything that hasn't been declared a path yet to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});