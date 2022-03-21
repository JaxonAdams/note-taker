const express = require('express');
const { notes } = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});