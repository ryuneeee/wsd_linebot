const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/codes');
const db = mongoose.connection;
db.on('error', (e) => { console.log('db error: ' + e); });
db.on('connected', () => { console.log('Connected successfully to server'); });

const Code = require('./models/code-model');

// middleware
function isLogined(req, res, next) {
  let user = req.session.user || null;

  if (user == null) {
    return res.status(403).json({ 'error': 'not login' }).end(); // TODO: make exception
  }

  next();
}

function verifyCtxId(req, res, next) {
  let ctxId = req.params.id || null;

  if (ctxId == null)
    return res.status(400).json({ 'error': 'no context id'}).end(); // TODO: make exception

  if (/^[CRU]{1}[0-9a-f]{32}$/g.test(ctxId) == false)
    return res.status(400).json({ 'error': 'illegal context id format'}).end(); // TODO: make exception

  next();
}

function verifyCode(req, res, next) {
  let name = req.body.name || null;
  let content = req.body.content || null;

  if (name == null)
    return res.status(400).json({ 'error': 'no code name'}).end(); // TODO: make exception

  if (content == null)
    return res.status(400).json({ 'error': 'no code content'}).end(); // TODO: make exception

  if (name == '')
    return res.status(400).json({ 'error': 'empty code name'}).end(); // TODO: make exception

  if (content == '')
    return res.status(400).json({ 'error': 'empty code content'}).end(); // TODO: make exception

  next();
}

function verifyCodeId(req, res, next) {
  let codeId = req.params.id || null;

  if (codeId == null)
    return res.status(400).json({ 'error': 'no code id'}).end(); // TODO: make exception

  if (/^[0-9a-f]{24}$/g.test(codeId) == false)
    return res.status(400).json({ 'error': 'illegal code id format'}).end(); // TODO: make exception

  next();
}

// get code list by context id
router.get('/codes/:id', isLogined, verifyCtxId, (req, res, next) => {
  Code.find({'ctxId': req.params.id}, '_id name date ', (err, result) => {
    if (err) return res.status(500).json({ 'error': err }); // TODO: make exception
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
router.get('/code/:id', isLogined, verifyCodeId, (req, res, next) => {
  Code.findOne({ '_id': req.params.id }, (err, result) => {
    if (err) return res.status(500).json({ 'error': err }); // TODO: make exception
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
router.post('/code/:id', isLogined, verifyCtxId, verifyCode, (req, res, next) => {
  // insert one itme
  let c = new Code();
  c.ctxId = req.params.id;
  //c.writer = req.session.user; -- this maybe get by session
  c.name = req.body.name;
  c.content = req.body.content;
  //c.date = // default value

  c.save((err, result) => {
    if (err) return res.status(500).json({ 'error': err }); // TODO: make exception
    res.json({'result': 'success'}).end();
  });
});

// update code by code id
router.put('/code/:id', isLogined, verifyCodeId, verifyCode, (req, res, next) => {
  Code.findOneAndUpdate({ '_id': req.params.id }, {
      //'contextId': // maybe never change?
      //'userid': // maybe?
      'name': req.body.name,
      'content': req.body.content,
      'date': Date.now() // this is right?
    }, (err, result) => {
      if (err) return res.status(500).json({ 'error': err }); // TODO: make exception
      res.json({'result': 'success'}).end();
    }
  );
});

// delete code by code id
router.delete('/code/:id', isLogined, verifyCodeId, (req, res, next) => {
  Code.remove({ '_id': req.params.id }, (err, result) => {
    if (err) return res.status(500).json({ 'error': err }); // TODO: make exception
    res.json({'result': 'success'}).end();
  });
});

module.exports = router;
