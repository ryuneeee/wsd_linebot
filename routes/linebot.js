const express = require('express');
const runScript = require('../scriptRunner/script');
const lineSandbox = require('../scriptRunner/lineSandbox');
const schedule = require('node-schedule');
const router = express.Router();

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

//line bot & vm
const line = require('@line/bot-sdk');
const client = new line.Client(config);


//line bot webhook
router.post('/', line.middleware(config), (req, res, next) => {
    try {
        res.json(req.body.events.map(handleEvent));
    } catch (e) {
        next(e);
    }
});

function script(event) {
    let code = event.message.text.substring(1);
    let sandbox = lineSandbox(client, event);
    runScript(sandbox, '(function(){\n' + code + '\n})();');
}

function handleEvent(event) {
    if (event.message.text[0] === '*') schedule.scheduleJob('*/1 * * * *', function () { script(event) });
    if (event.message.text[0] === '>') script(event);
}


// error handler
router.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    console.error(err);
});



module.exports = router;
