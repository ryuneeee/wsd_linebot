const express = require('express');
const ScriptRunner = require('../scriptRunner/script');
const schedule = require('node-schedule');
const router = express.Router();
let jobId = 0;

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};


//line bot & vm
const line = require('@line/bot-sdk');
const client = new line.Client(config);
const runner = new ScriptRunner();
runner.setRequires(['request', 'cheerio', 'iconv']);

const getCtxId = function(e) {
    if (e.source.type === 'user')  return e.source.userId;
    if (e.source.type === 'group') return e.source.groupId;
    if (e.source.type === 'room')  return e.source.roomId;
};

function script(event) {
    let code = event.message.text.substring(1);
    let ctxId = getCtxId(event);
    let sandbox = {
        event: event,
        message: event.message,
        reply: function (message) {
            if (!(message instanceof String)) message = String(message);
            client.pushMessage(ctxId, {type: 'text', 'text': message});
        }
    };
    if (runner._events.error === undefined)
        runner.on('error', function(e){ sandbox.reply(e.message) });

    runner.setContextId(ctxId);
    runner.run('(function(){\n' + code + '\n})();', sandbox);
}

//line bot webhook
router.post('/', line.middleware(config), (req, res) => {
    try {
        res.json(req.body.events.map(handleEvent));
    } catch (e) {
        console.error(e);
    }
});


function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text[0] === '*') {
        schedule.scheduleJob(jobId.toString(), '*/1 * * * *', () => { script(event) });
        //TODO: bug fixes & structure
        lineSandbox(client, event).reply('jobId: ' + jobId++);
    }

    if (event.message.text[0] === '^'){
        let jid = event.message.text.substring(1);
        if(schedule.scheduledJobs[jid] === undefined) return;
        schedule.scheduledJobs[jid].cancel();
        //TODO: bug fixes & structure
        lineSandbox(client, event).reply('Canceled jobId: ' + jid);
    }

    if (event.message.text[0] === '>')
        script(event);
}


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
