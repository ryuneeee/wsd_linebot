const sdk = require('@line/bot-sdk');
const ScriptRunner = require('./script');
const Code = require('../models/code-model');
const runner = new ScriptRunner();
runner.setRequires(['request', 'cheerio', 'iconv', 'axios']);
// runner.on('error', (error, box) => { box.reply(error.message); });

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

class Line{
    constructor(cfg) {
        this.config = cfg || config;
        this.client = new sdk.Client(this.config);
        this.middleware = sdk.middleware(config);
        this.code = ''
    }

    getCtxId(e) {
        if (e.source.type === 'user')  return e.source.userId;
        if (e.source.type === 'group') return e.source.groupId;
        if (e.source.type === 'room')  return e.source.roomId;
        throw new Error('Can\'t find context Id');
    };


    reply(message, event){
        if (!(message instanceof String)) message = String(message);
        this.client.pushMessage(this.getCtxId(event), {type: 'text', 'text': message});
    };

    pushMessage(message, event){
        this.client.pushMessage(this.getCtxId(event), message);
    };

    script(event){
        let ctxId = this.getCtxId(event);
        let sandbox = this.createSandbox(event);

        this.getCodeByCtxId(ctxId, (codes) => {
            for (let i in codes){
                if(codes[i].interval !== null) continue;
                runner.setContextId(ctxId);
                runner.run(this.createCode(codes[i].content), sandbox);
            }
        });

    };

    scriptJob(code){
        this.cancelJob(code.id);
        if(code.interval === null) return;

        runner.addJob(code.id, code.interval, ()=> {
            let event = this.createEmptyEvent(code);
            let sandbox = this.createSandbox(event);
            runner.setContextId(code.ctxId);
            runner.run(this.createCode(code.content), sandbox);
        });
    }

    cancelJob(jobId){
        if(runner.isRunningJob(jobId)) {
            runner.cancelJob(jobId);
        }
    }

    createCode(code){
        return '(function(){\n' + code + '\n})();'
    }

    getCodeByCtxId(ctxId, f) {
        return Code.find({'ctxId': ctxId}, (err, result) => {
            f(result);
        });
    }

    createSandbox(event) {
        return {
            event: event,
            message: event.message,
            reply: (message) => this.reply(message, event),
            pushMessage: (message) => this.pushMessage(message, event)
        };
    }

    createEmptyEvent(code) {
        let event = {};
        let ctxPrefix = code.ctxId.substr(0,1);
        if(ctxPrefix === 'U') event.source = {"type": "user", "userId": code.ctxId};
        if(ctxPrefix === 'C') event.source = {"type": "group", "groupId": code.ctxId};
        if(ctxPrefix === 'R') event.source = {"type": "room", "roomId": code.ctxId};
        return event;
    }

    loadJob() {
        Code.find({}, (err, codes) => {
            console.info("Loading " + codes.length + " script ...");
            for (let i in codes) if(codes[i].interval) this.scriptJob(codes[i]);
            console.info("Done!");
        });
    }
}


module.exports = Line;