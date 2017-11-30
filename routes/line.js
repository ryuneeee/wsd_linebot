const sdk = require('@line/bot-sdk');
const ScriptRunner = require('../scriptrunner/script');
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
    }

    getCtxId(e) {
        if (e.source.type === 'user')  return e.source.userId;
        if (e.source.type === 'group') return e.source.groupId;
        if (e.source.type === 'room')  return e.source.roomId;
    };


    reply(message, event){
            if (!(message instanceof String)) message = String(message);
            this.client.pushMessage(this.getCtxId(event), {type: 'text', 'text': message});
    };

    script(event){
        let code = event.message.text.substring(1);
        let ctxId = this.getCtxId(event);
        let sandbox = {
            event: event,
            message: event.message,
            reply: (message) => this.reply(message, event)
        };
        if (runner._events.error === undefined)
            runner.on('error', function(e){
                sandbox.reply(e.message)
            });

        runner.setContextId(ctxId);
        runner.run('(function(){\n' + code + '\n})();', sandbox);
    };

}



module.exports = Line;