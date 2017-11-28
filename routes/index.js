const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
mongoose.connect('mongodb://localhost/db');
const db = mongoose.connection;

// check db connection
db.on('error', (err) => {
    console.log("error: " + err);
});
db.on('connected', () => {
    console.log("Connected successfully to server");
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: String,
    password: String,
});

const User = mongoose.model('User', userSchema);


router.post('/login.js', (req, res) => {
    console.log('Im in login.js') //debug
    console.log(req.body);
    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    if (req.session.user) {
        // already be logged in
        console.log('Already be logged in')
        res.send(JSON.stringify(paramId));
    } else {
        // no in session
        User.findOne({ id: paramId, password: paramPassword}, (err, user) => {
            if(user !== null) {
                console.log('You are not logged in')
                req.session.user = {
                    id: paramId,
                    authorized: true
                };
                console.log("Login success");
                res.send(JSON.stringify(paramId));
            } else {
                console.log('Login failed');
                res.send(JSON.stringify(paramId));
            }
        })
    }
});

router.post('/join.js', (req, res) => {
    console.log('Im in join.js') //debug
    let paramId = req.body.userid;
    let paramPassword = req.body.userpw;

    if (paramId === "" || paramId === "") {
        console.log("Input Id or Password");
        res.send(JSON.stringify(paramId));
    } else {
        console.log('Checking already in used ID');
        User.findOne({id: paramId}, (err, user) => {
            if (err) return handleError(err);
            // There is no same input id
            if (user === null) {
                console.log('No already in used ID')
                let newUser = new User({id: paramId, password: paramPassword});
                newUser.save((err, data) => {
                    if (err)
                        console.log('Data save error');
                });
                res.send(JSON.stringify(paramId));
                console.log("Join success!");
            }
            else // input id already exists
                {
                console.log("This Id is already in used.");
                res.send(JSON.stringify(paramId));
            }
        });
    }
});

module.exports = router;
