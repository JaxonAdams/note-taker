const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');

const app = express();

// parse incoming data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// use css and js files in /public
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

function findById(id, notesArr) {
    const result = notesArr.filter(note => note.id === id)[0];
    return result;
};

// create note and post it
function createNewNote(body, notesArr) {
    const note = body;
    notesArr.push(note);

    // update db.json
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );

    return note;
};

// validate note before posting
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    if (!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
};

// get all notes in the database
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// get a specific id, may be useful for displaying notes and deleting notes
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// delete a note from the database
app.delete('/api/notes/:id', (req, res) => {
    // read db.json and pull out all notes except the one with the specified id
    const newNotes = notes.filter(note => note.id != req.params.id);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notes: newNotes }, null, 2));
    
    res.json(newNotes);
});

// add a new note to the database
app.post('/api/notes', (req, res) => {
    // generate new id for the note
    req.body.id = Number(Math.floor(Math.random() * 1000000).toString());

    // if any data posted is incorrect, send error
    if (!validateNote(req.body)) {
        res.status(400).send('Sorry, your note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// serve landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});