const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/db');
const db = mongoose.connection;
db.on('error', (e) => { console.log('db error: ' + e); });
db.on('connected', () => { console.log('Connected successfully to server'); });

const User = require('./models/user-model');

// middleware
function isNotLogined(req, res, next) {
  if (req.session.user) {
    return res.status(403).end(); // TODO: make exception
  }
  next();
}

function varifyUserCred(req, res, next) {
  let paramId = req.body.userid || null;
  let paramPassword= req.body.userpw || null;
  if (paramId === null ||
      paramPassword === null ||
      paramId === '' ||
      paramPassword === '') {
      return res.status(400).end(); // TODO: make exception
  }

  next();
}

router.post('/login', isNotLogined, varifyUserCred, (req, res) => {
    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    // no in session
    User.findOne({ id: paramId }, function (err, user){
        if (err) res.send(400);
        if (user !== null) {
            user.comparePassword(paramPassword, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.user = {
                        id: paramId,
                        authorized: true
                    };
                    res.status(200).end();
                } else {
                    res.status(401).end();
                }
            });
        } else {
            res.status(401).end();
        }
    });

});

router.post('/join', isNotLogined, varifyUserCred, (req, res) => {

    let paramId = req.body.userid;
    let paramPassword= req.body.userpw;

    User.findOne({id: paramId}, (err, user) => {
        if (err) return handleError(err);

        // There is no same input id
        if (user === null) {
            let newUser = new User({
              id: paramId,
              password: paramPassword
            });
            newUser.save((err, data) => {
                if (err) throw err;
            });
            res.status(200).end();
        }
        else // input id already exists
        {
            // already exist;
            res.status(405).end();
        }
    });

});

// logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.status(200).end();
    });
});

router.post('/checkSess',(req, res) => {
    if(req.session.user) {
        res.status(200).json(req.session.user.id).end(); // TODO : potentially vulnerable
    } else {
        res.status(401).end();
    }
});

module.exports = router;
