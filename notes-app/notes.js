const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    console.log('Your notes...');
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

// Add note
const addNote = (title, body) => {
    const notes = loadNotes();
    const dublicateNotes = notes.find(note => note.title === title);

    if (!dublicateNotes) {
        notes.push({
            title: title,
            body: body
        });

        saveNote(notes);
        console.log(chalk.bgGreen.black('Note Saved!'));

    } else {
        console.log(chalk.bgYellow.black('Note title taken!'));
    }

}


// Remove note
const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => {
        return note.title != title;
    });

    if (updatedNotes.length === notes.length) {
        console.log(chalk.red('Note not found!'));
    } else {
        saveNote(updatedNotes);
        console.log(chalk.bgGreen.black('Note deleted!'));
    }
}


// List all Notes
const listNotes = () => {
    const notes = loadNotes()
    console.log('Your Notes\n')
    notes.forEach(note => {
        console.log(note.title);
    });
}


// Read a note
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note) {
        console.log('Title: ', note.title)
        console.log(note.body)
    } else {
        console.log(chalk.bgYellow.black.bold('Note not found!'));
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}