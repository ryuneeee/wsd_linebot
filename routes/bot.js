const domain = require('domain').create();
const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

//line bot & vm
const line = require('@line/bot-sdk');
const client = new line.Client(config);
const vm = require('vm');
const timeout = 1000;

//line bot webhook
router.post('/', line.middleware(config), (req, res) => {
    res.json(req.body.events.map(handleEvent))
});

// toString overriding for prevent that user can seeing.
Function.prototype.toString = function(){
    return "You can't see function code."
};

// require module wrapper
const whiteRequire = function(moduleName){
    let whitelist = ['request', 'cheerio'];
    if(whitelist.includes(moduleName)) {
        return require(moduleName);
    }else{
        throw new Error("You can't load unauthorized script.");
    }
};

const contexts = new Map();

const getCtxId = function(e) {
    if (e.source.type === 'user')  return e.source.userId;
    if (e.source.type === 'group') return e.source.groupId;
    if (e.source.type === 'room')  return e.source.roomId;
};

const getContext = function(id) {
    if (!contexts.has(id)) {
        contexts.set(id, new Map());
    }
    return contexts.get(id);
};

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    let ctxId = getCtxId(event);
    let context = getContext(ctxId);
    const reply = function (message) {
        if(!(message instanceof String)) message = String(message);
        client.pushMessage(ctxId, {type: 'text', 'text': message});
    };

    if (event.message.text[0] === '>') {
        let code = event.message.text.substring(1);

        code = '(function(){\n' + code + '\n})();';
        const sandbox = {
            require: whiteRequire,
            client: client, // TODO: will be deleted
            event: event,
            message: event.message,
            reply: reply,
            setValue: function(k, v) { context.set(k, v); },
            getValue: function(k) { return context.get(k); },
            delValue: function(k) { context.delete(k); }
        };

        // http://programmingsummaries.tistory.com/375
        domain.on('error', (err) => {
            client.replyMessage(event.replyToken, {type:'text', text: err.message});
        });

        domain.run(function(){
            const script = new vm.Script(code);
            script.runInNewContext(sandbox, {timeout: timeout, displayErrors: true});

        });
    }
}

module.exports = router;
