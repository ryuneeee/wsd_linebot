const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const BadRequest = require('../errors/error.400');
const Unauthorized  = require('../errors/error.401');
const Forbidden  = require('../errors/error.403');
const InternalServerError = require('../errors/error.500');

mongoose.connect('mongodb://localhost/db');
const db = mongoose.connection;

const User = require('../models/user-model');

// middleware
function isNotLogined(req, res, next) {
  if (req.session.user) {
    throw new Forbidden('already loggined');
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
      throw new BadRequest('bad userid or userpw');
  }

  next();
}

router.post('/login', isNotLogined, varifyUserCred, (req, res, next) => {
    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    // no in session
    User.findOne({ id: paramId }, function (err, user){
        //if (err) throw new InternalServerError(err);
        if (err) next(new InternalServerError(err));
        if (user !== null) {
            user.comparePassword(paramPassword, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.user = {
                        id: paramId,
                        authorized: true
                    };
                    res.status(200).json({}).end();
                } else {
                    //throw new Unauthorized('Illegal password.');
                    next(new Unauthorized('Illegal password.'));
                }
            });
        } else {
            //throw new Unauthorized('no such user');
            next(new Unauthorized('no such user'));
        }
    });

});

router.post('/join', isNotLogined, varifyUserCred, (req, res, next) => {

    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    User.findOne({id: paramId}, (err, user) => {
        if (err) next(new InternalServerError(err));

        // There is no same input id
        if (user === null) {
            let newUser = new User({
              id: paramId,
              password: paramPassword
            });
            newUser.save((err, data) => {
                //if (err) throw new InternalServerError(err);
                if (err) next(new InternalServerError(err));
            });
            res.status(200).json({}).end();
        }
        else // input id already exists
        {
            // already exist;
            //throw new BadRequest('userid is already exist');
            /*next({
              'message': 'userid is already exist',
              'status': 400
            });
            */
            next(new BadRequest('userid is already exist'));
        }
    });

});

// logout
router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        //if(err) throw new InternalServerError(err);
        if (err) next(new InternalServerError(err));
        res.status(200).json({}).end();
    });
});

router.post('/checkSess',(req, res, next) => {
    if(req.session.user) {
        res.status(200).json(req.session.user.id).end(); // TODO : potentially vulnerable
    } else {
        throw new Unauthorized('not login');
    }
});

module.exports = router;
