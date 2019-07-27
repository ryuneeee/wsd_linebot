const ScriptRunner = require('./script');
const Code = require('../models/code-model');
const runner = new ScriptRunner();
const { RichEmbed, MessageEmbedImage } = require('discord.js');
runner.setRequires(['request', 'cheerio', 'iconv', 'axios', 'puppeteer']);
// runner.on('error', (error, box) => { box.reply(error.message); });

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

class Discord{
    constructor(cfg) {
        this.config = cfg || config;
        this.code = ''
    }

    getCtxId(e) {
        return e.channel.id;
    };


    reply(message, event){
        // if (!(message instanceof String)) message = String(message);
        // this.client.pushMessage(this.getCtxId(event), {type: 'text', 'text': message});
        event.reply(message);
    };

    send(message, event){
        let channel = this.client.channels.find("id", event.channel.id);
        channel.send(message);
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
            message: event,
            to: (username) => this.getMention(username),
            send: (message) => this.send(message, event),
            reply: (message) => this.reply(message, event),
            setTimeout: setTimeout,
        };
    }

    createEmptyEvent(code) {
        let event = {};
        event.channel = {"id": code.ctxId};
        return event;
    }

    loadJob() {
        Code.find({}, (err, codes) => {
            console.info("Loading " + codes.length + " script ...");
            for (let i in codes) if(codes[i].interval) this.scriptJob(codes[i]);
            console.info("Done!");
        });
    }

    getMention(username) {
        try {
            return `<@${this.client.users.find("username", username).id}>`
        } catch (e) {
            return "@null"
        }
    }
}


module.exports = Discord;