const express = require('express');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const { notes } = require('./db/db.json');

const app = express();

// parse incoming data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// instruct app to use proper routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});