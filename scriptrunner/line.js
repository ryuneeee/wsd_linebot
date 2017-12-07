const sdk = require('@line/bot-sdk');
const ScriptRunner = require('./script');
const Code = require('../models/code-model');
const mongoose = require("mongoose");
const runner = new ScriptRunner();
runner.setRequires(['request', 'cheerio', 'iconv']);

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};


mongoose.connect('mongodb://localhost/codes');
const db = mongoose.connection;
db.on('error', (e) => { console.log('db error: ' + e); });
db.on('connected', () => { console.log('Connected successfully to server'); });

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

    script(event){
        let ctxId = this.getCtxId(event);
        let sandbox = this.createSandbox(event);
        sandbox.client = this.client;
        if (runner._events.error === undefined)
            runner.on('error', (e) => {
                this.reply(e.message);
            });
        this.getCodeByCtxId(ctxId, (codes) => {
            for (let i in codes){
                runner.setContextId(ctxId);
                runner.run(this.createCode(codes[i].content), sandbox); //TODO: request get predefined code database query by context Id
            }
        });

    };

    createSandbox(event) {
        return {
            event: event,
            message: event.message,
            reply: (message) => this.reply(message, event)
        };
    }

    createCode(code){
        return '(function(){\n' + code + '\n})();'
    }

    getCodeByCtxId(ctxId, f) {
        return Code.find({'ctxId': ctxId}, (err, result) => {
            f(result);
        });
    }
}



module.exports = Line;