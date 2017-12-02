let jobId = 0;
const express = require('express');
const Line = require('../scriptrunner/line');
const schedule = require('node-schedule');
const router = express.Router();
const line = new Line();



function handleEvent(event){
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text[0] === '*') {
        schedule.scheduleJob(jobId.toString(), '*/1 * * * *', () => { line.script(event) });
        line.reply('jobId: ' + jobId++, event);
    }

    if (event.message.text[0] === '^'){
        let jid = event.message.text.substring(1);
        if(schedule.scheduledJobs[jid] === undefined) return;
        schedule.scheduledJobs[jid].cancel();
        line.reply('Canceled jobId: ' + jid, event);
    }

    if (event.message.text[0] === '>')
        line.script(event);

    if (event.message.text === '!script'){
        line.reply("https://bot.ryuneeee.com/" + line.getCtxId(event), event);
    }
};

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
