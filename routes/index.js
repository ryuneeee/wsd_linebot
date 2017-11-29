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

router.post('/login.js', (req, res) => {
    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    if (req.session.user) {
        // already be logged in
        res.send(JSON.stringify("You are already logged in"));
    } else {
        // no in session
        User.findOne({ id: paramId }, (err, user) => {
            if (err) res.send(400);

            user.comparePassword(paramPassword, (err, isMatch) => {
                if(err) throw err;

                if(isMatch) {
                    req.session.user = {
                        id: paramId,
                        authorized: true
                    };
                    res.send(JSON.stringify("Login success"));
                }  else {
                    res.send(JSON.stringify("ID or password incorrect"));
                }
            });
        })
    }
});

router.post('/join.js', (req, res) => {

    let paramId = req.body.userid;
    let paramPassword= req.body.userpw;
    if (paramId === "" || paramId === "") {
        res.send(JSON.stringify("Input ID or password"));
    } else {
        User.findOne({id: paramId}, (err, user) => {
            if (err) return handleError(err);
            // There is no same input id
            if (user === null) {
                let newUser = new User({id: paramId, password: paramPassword});
                newUser.save((err, data) => {
                    if (err) throw err;
                    console.log(data);
                });
                res.send(JSON.stringify("Join success"));
            }
            else // input id already exists
            {
                res.send(JSON.stringify("This ID is already in used"));
            }
        });
    }
});

// logout
router.post('/logout.js', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/');
    })

});


module.exports = router;
