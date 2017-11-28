const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


mongoose.connect('mongodb://localhost/codes');
const db = mongoose.connection;
db.on('error', (e) => { console.log("db error: " + e) });
db.on('connected', () => { console.log("Connected successfully to server") });

const Code = mongoose.model('Code', new mongoose.Schema({
  'ctxId': String,  // where this code will execute
  'writer': String,     // who this code wrote
  'name': String,       // the code name
  'content': String,    // the code content
  'date': { 'type': Date, 'default': Date.now } // date
}));


// get code list by context id
router.get('/codes/:id', (req, res, next) => {
  Code.find({ctxId: req.params.id}, '_id name date ', (err, result) => {
    if (err) return res.status(500).json({ 'error': err });
    let ret = [];
    result.forEach((ele, idx, err) =>{
      ret.push({'id': ele['_id'],
              'name': ele['name'],
              'date': ele['date']});
    });
    res.json(ret).end();
  });
});

// get code by code id
router.get('/code/:id', (req, res, next) => {
  Code.findOne({ '_id': req.params.id }, (err, result) => {
    if (err) return res.status(500).json({ 'error': err });
    let ret = {
      'id': result._id,
      'ctxId': result.ctxId,
      'writer': result.writer,
      'name': result.name,
      'content': result.content,
      'date': result.date
    };
    res.json(ret).end();
  });
});

// insert code by context id
router.post('/code/:id', (req, res, next) => {
  let c = new Code();
  c.ctxId = req.params.id;
  //c.userId = req.body.userId; -- this maybe get by session
  c.name = req.body.name;
  c.content = req.body.content;
  //c.date = // default value
  c.save((err, result) => {
    if (err) return res.status(500).json({ 'error': err });
    res.json({'result': 'success'}).end();
  });
});

// update code by code id
router.put('/code/:id', (req, res, next) => {
  Code.findOneAndUpdate({ '_id': req.params.id }, {
      //'contextId': // maybe never change?
      //'userid': // maybe?
      'name': req.body.name,
      'content': req.body.content,
      'date': Date.now() // this is right?
    }, (err, result) => {
      if (err) return res.status(500).json({ 'error': err });
      res.json({'result': 'success'}).end();
    }
  );
});

// delete code by code id
router.delete('/code/:id', (req, res, next) => {
  let _id = req.params.id || null;
  if (_id == null) return res.json({'result': 'fail', 'message': 'no code id'}).end();
  Code.remove({ '_id': _id }, (err, result) => {
    if (err) return res.status(500).json({ 'error': err });
    res.json({'result': 'success'}).end();
  });
});

module.exports = router;
