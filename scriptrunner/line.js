const sdk = require('@line/bot-sdk');
const ScriptRunner = require('./script');
const Code = require('../models/code-model');
const runner = new ScriptRunner();
runner.setRequires(['request', 'cheerio', 'iconv']);

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
        if (runner._events.error === undefined)
            runner.on('error', (box, error) => {
                box.reply(error.message);
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
            reply: (message) => this.reply(message, event),
            pushMessage: (message) => this.pushMessage(message, event)
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