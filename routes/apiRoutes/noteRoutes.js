const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { findById, createNewNote, validateNote } = require('../../lib/Notes');
const { notes } = require('../../db/db.json');

// get all notes in the database
router.get('/notes', (req, res) => {
    res.json(notes);
});

// get a specific id, may be useful for displaying notes and deleting notes
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// delete a note from the database
router.delete('/notes/:id', (req, res) => {
    // read db.json and pull out all notes except the one with the specified id
    const newNotes = notes.filter(note => note.id != req.params.id);

    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify({ notes: newNotes }, null, 2));
    
    res.json(newNotes);
});

// add a new note to the database
router.post('/notes', (req, res) => {
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

module.exports = router;