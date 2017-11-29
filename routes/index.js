const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
mongoose.connect('mongodb://localhost/db');
const db = mongoose.connection;
const User = require('./models/user-model');

// check db connection
db.on('error', (err) => {
    console.log("error: " + err);
});
db.on('connected', () => {
    console.log("Connected successfully to server");
});

router.post('/login', (req, res) => {
    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    if (req.session.user) {
        // already be logged in
        let r = Object();
        r.result = 1;
        res.status(403).json(r).end();
    } else {
        // no in session
        User.findOne({ id: paramId }, function (err, user){
            if (err) res.send(400);
            if (user !== null) {
                user.comparePassword(paramPassword, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        req.session.user = {
                            id: paramId,
                            authorized: true
                        };
                        let r = Object();
                        r.result = 0;
                        res.status(200).json(r).end();
                    } else {
                        let r = Object();
                        r.result = 2;
                        res.status(401).json(r).end();
                    }
                });
            } else {
                let r = Object();
                r.result = 2;
                res.status(401).json(r).end();
            }
        })
    }
});

router.post('/join', (req, res) => {

    let paramId = req.body.userid;
    let paramPassword= req.body.userpw;
    if (paramId === "" || paramId === "") {
        let r = new Object();
        r.result = 1;
        res.status(400).json(r).end();
    } else {
        User.findOne({id: paramId}, (err, user) => {
            if (err) return handleError(err);
            // There is no same input id
            if (user === null) {
                let newUser = new User({id: paramId, password: paramPassword});
                newUser.save((err, data) => {
                    if (err) throw err;
                });
                let r = new Object();
                r.result = 0;
                res.status(200).json(r).end();
            }
            else // input id already exists
            {
                let r = new Object();
                r.result = 2; // already exist;
                res.status(405).json(r).end();
            }
        });
    }
});

// logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/');
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
