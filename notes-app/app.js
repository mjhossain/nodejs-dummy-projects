const fs = require('fs');

//fs.writeFileSync('notes.txt', 'Test file created');
fs.appendFileSync('notes.txt', '\nthis is using fs.appendFileSync()');