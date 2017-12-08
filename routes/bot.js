const express = require('express');
const app = require('../app');
const line = app.line;
const router = express.Router();


function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text === '!script')
        line.reply("https://" + process.env.LINE_BOT_ADDR + "/" + line.getCtxId(event), event);
    else
        line.script(event);

}

//line bot webhook
router.post('/', line.middleware, (req, res) => {
    try {
        res.json(req.body.events.map(handleEvent));

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
