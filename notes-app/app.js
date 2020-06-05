const fs = require('fs');
const chalk = require('chalk');
const notes = require('./notes.js');
const yargs = require('yargs');

//console.log(chalk.bold.green.inverse('Success!'));
// console.log(process.argv);
// console.log(yargs.argv);

//console.log('hello')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    handler: function() {
        console.log('Adding a note..')
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing a note..')
    }
});

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function() {
        console.log('Listing all notes..')
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Reading a note..')
    }
});


console.log(yargs.argv);