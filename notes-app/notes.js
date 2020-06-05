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
    const dublicateNotes = notes.filter((note) => {
        return note.title === title;
    });

    if (dublicateNotes.length === 0) {
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


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}