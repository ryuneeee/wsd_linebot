const assert = require('chai').assert;
const Line = require('../routes/line');

describe('LineBot', function() {

    describe('Reply', function(){
        let event = {
            "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
            "type": "message",
            "timestamp": 1462629479859,
            "source": { "type": "user", "userId": "U9b01f7ca011a06989203b170bf928374" },
            "message": { "id": "325708", "type": "text", "text": ""}
        };

        it('Reply', () => {
            let line = new Line();
            line.reply = message => { assert.equal(message, '1') };
            event.message.text = '>reply(1)';
            line.script(event);
        });

        it('Reply2', () => {
            let line = new Line();
            line.reply = message => { assert.equal(message, 'Hello World') };
            event.message.text = '>reply("Hello World")';
            line.script(event);
        });

        it('Reply with userId', () => {
            let line = new Line();
            line.reply = message => { assert.equal(message, event.source.userId) };
            event.message.text = '>reply(event.source.userId)';
            line.script(event);
        });

    });


    describe('Context Id', function(){
        let event = { "source": {} };

        it('Not enough source content', () => {
            let line = new Line();
            assert.throws(function(){
                line.getCtxId(event);
            }, "Can't find context Id")
        });

        it('userId', () => {
            let line = new Line();
            event.source.type = 'user';
            event.source.userId = 'U9b01f7ca011a06989203b170bf928374';
            assert.equal(line.getCtxId(event), event.source.userId);
        });

        it('roomId', () => {
            let line = new Line();
            event.source.type = 'room';
            event.source.roomId = 'U9b01f7ca011a06989203b170bf928374';
            assert.equal(line.getCtxId(event), event.source.roomId);
        });

        it('groupId', () => {
            let line = new Line();
            event.source.type = 'group';
            event.source.groupId = 'U9b01f7ca011a06989203b170bf928374';
            assert.equal(line.getCtxId(event), event.source.groupId);
        });
    });

});