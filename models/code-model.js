const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    'ctxId': String,  // where this code will execute
    'writer': String,     // who this code wrote
    'name': String,       // the code name
    'interval': String,
    'content': String,    // the code content
    'date': { 'type': Date, 'default': Date.now } // date
});

module.exports = mongoose.model('Code', schema);
