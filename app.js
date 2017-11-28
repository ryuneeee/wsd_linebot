// modules
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

//express
const express = require('express');
const app = express();

// parser & view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set('env', 'development');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//express router
//app.use('/', require('./routes/index'));
app.use('/bot', require('./routes/linebot'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/code'));

// proxy to Angular
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    let message = err.message;
    let error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.send(
      '<h1>' + message + '</h1>\n' +
      //'<h2>' + err.status + '</h2>\n' +
      '<pre>' + err.stack + '</pre>');
    //res.send();
    res.send();
    //console.log(err);

    res.end();

});

module.exports = app;
