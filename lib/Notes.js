const fs = require('fs');
const path = require('path');

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
        path.join(__dirname, '../db/db.json'),
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

module.exports = { 
    findById,
    createNewNote,
    validateNote
};