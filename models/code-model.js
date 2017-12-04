const mongoose = require('mongoose');

module.exports = mongoose.model('Code', new mongoose.Schema({
  'ctxId': String,  // where this code will execute
  'writer': String,     // who this code wrote
  'name': String,       // the code name
  'interval': Number,
  'content': String,    // the code content
  'date': { 'type': Date, 'default': Date.now } // date
}));
