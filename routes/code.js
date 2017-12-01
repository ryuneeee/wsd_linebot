const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const BadRequest = require('../errors/error.400');
const Forbidden  = require('../errors/error.403');
const InternalSE = require('../errors/error.500');

mongoose.connect('mongodb://localhost/codes');
const db = mongoose.connection;
db.on('error', (e) => { console.log('db error: ' + e); });
db.on('connected', () => { console.log('Connected successfully to server'); });

const Code = require('./models/code-model');

// middleware
function isLogined(req, res, next) {
  let user = req.session.user || null;

  if (user === null)
    throw new Forbidden('not login');

  next();
}

function verifyCtxId(req, res, next) {
  let ctxId = req.params.id || null;

  if (ctxId === null)
    throw new BadRequest('no context id');

  if (/^[CRU]{1}[0-9a-f]{32}$/g.test(ctxId) == false)
    throw new BadRequest('illegal context id format');

  next();
}

function verifyCode(req, res, next) {
  let name = req.body.name || null;
  let content = req.body.content || null;

  if (name === null)
    throw new BadRequest('no code name');

  if (content === null)
    throw new BadRequest('no code content');

  if (name === '')
    throw new BadRequest('empty code name');

  if (content === '')
    throw new BadRequest('empty code content');

  next();
}

function verifyCodeId(req, res, next) {
  let codeId = req.params.id || null;

  if (codeId === null)
    throw new BadRequest('no code id');

  if (/^[0-9a-f]{24}$/g.test(codeId) === false)
    throw new BadRequest('illegal code id format');

  next();
}


// get code list by context id
router.get('/codes/:id', isLogined, verifyCtxId, (req, res, next) => {
  Code.find({'ctxId': req.params.id}, '_id name date ', (err, result) => {
    //if (err) throw new InternalSE(err);
    if (err) next(new InternalSE(err));
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
    //if (err) throw new InternalSE(err);
    if (err) next(new InternalSE(err));
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
  //c.writer = req.session.user;
  c.name = req.body.name;
  c.content = req.body.content;
  //c.date = // default value

  c.save((err, result) => {
    //if (err) throw new InternalSE(err);
    if (err) next(new InternalSE(err));
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
      //if (err) throw new InternalSE(err);
      if (err) next(new InternalSE(err));
      res.json({'result': 'success'}).end();
    }
  );
});

// delete code by code id
router.delete('/code/:id', isLogined, verifyCodeId, (req, res, next) => {
  Code.remove({ '_id': req.params.id }, (err, result) => {
    //if (err) throw new InternalSE(err);
    if (err) next(new InternalSE(err));
    res.json({'result': 'success'}).end();
  });
});

module.exports = router;
