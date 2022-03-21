const express = require('express');
const { notes } = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

function findById(id, notesArr) {
    const result = notesArr.filter(note => note.id === id)[0];
    return result;
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});