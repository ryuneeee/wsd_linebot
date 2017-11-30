let jobId = 0;
const schedule = require('node-schedule');
const ScriptRunner = require('../scriptrunner/script');
const runner = new ScriptRunner();
runner.setRequires(['request', 'cheerio', 'iconv']);

//line bot & vm
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const line = require('@line/bot-sdk');
const client = new line.Client(config);
const middleware = line.middleware(config);


const getCtxId = function(e) {
    if (e.source.type === 'user')  return e.source.userId;
    if (e.source.type === 'group') return e.source.groupId;
    if (e.source.type === 'room')  return e.source.roomId;
};

const reply = function(ctxId){
    return function (message) {
        if (!(message instanceof String)) message = String(message);
        client.pushMessage(ctxId, {type: 'text', 'text': message});
    }
};

const script = function(event) {
    let code = event.message.text.substring(1);
    let ctxId = getCtxId(event);
    let sandbox = {
        event: event,
        message: event.message,
        reply: reply(ctxId)
    };
    if (runner._events.error === undefined)
        runner.on('error', function(e){ sandbox.reply(e.message) });

    runner.setContextId(ctxId);
    runner.run('(function(){\n' + code + '\n})();', sandbox);
}


const handleEvent = function(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text[0] === '*') {
        schedule.scheduleJob(jobId.toString(), '*/1 * * * *', () => { script(event) });
        //TODO: bug fixes & structure
        reply(getCtxId(event))('jobId: ' + jobId++);
    }

    if (event.message.text[0] === '^'){
        let jid = event.message.text.substring(1);
        if(schedule.scheduledJobs[jid] === undefined) return;
        schedule.scheduledJobs[jid].cancel();
        //TODO: bug fixes & structure
        reply(getCtxId(event))('Canceled jobId: ' + jid);
    }

    if (event.message.text[0] === '>')
        script(event);
};


module.exports = {
    client: client,
    middleware: middleware,
    handleEvent: handleEvent,
    reply: reply
};