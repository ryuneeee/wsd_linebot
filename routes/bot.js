const express = require('express');
const line = require('line');
const router = express.Router();

//line bot webhook
router.post('/', line.middleware(config), (req, res) => {
    try {
        res.json(req.body.events.map(line.handleEvent));
    } catch (e) {
        console.error(e);
    }
});


// error handler
router.use(function(err, req, res) {
    // set locals, only providing error in development
    console.error(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = router;
