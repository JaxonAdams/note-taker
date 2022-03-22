const fs = require('fs');
const { findById, createNewNote, validateNote } = require('../lib/Notes');
const { notes } = require('../db/db.json'); 

jest.mock('fs');

test('creates a note object', () => {
    const note = createNewNote(
        {
            title: "Practice",
            text: "More Practice"
        },
        notes
    );

    expect(note.title).toBe("Practice");
    expect(note.text).toBe("More Practice");
});

test('finds by id', () => {
    const startingNotes = [
        {
            title: "Practice",
            text: "More Practice",
            id: 123456
        },
        {
            title: "Practice2",
            text: "More Practice",
            id: 654321
        }
    ];

    const note = findById(654321, startingNotes);

    expect(note.title).toBe("Practice2");
});

test('validates note', () => {
    const validNote = {
        title: "Practice",
        text: "More Practice",
        id: 123456
    };

    const invalidNote = {
        title: "Practice2",
        id: 654321
    };

    const result1 = validateNote(validNote);
    const result2 = validateNote(invalidNote);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
});