// modules
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');



// express
const express = require('express');
// session
const session = require('express-session');
const app = express();
// set session
app.use(session({
    secret: 'jkasmhkn',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//express router
app.use('/', require('./routes/index'));
// app.use('/bot', require('./routes/bot'));
app.use('/users', require('./routes/users'));
// proxy to Angular
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(cookieParser());



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
