const assert = require('chai').assert;
const Line = require('../routes/line');

describe('LineBot', function() {

    let fakeTextMessageEvent = {
        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
        "type": "message",
        "timestamp": 1462629479859,
        "source": {
            "type": "user",
            "userId": "U4af4980629..."
        },
        "message": {
            "id": "325708",
            "type": "text",
            "text": ">reply('1');"
        }
    };


    describe('Default', function(){
        it('Basic Event', function(){
            let line = new Line();
            line.reply = function(){
                return function(message){
                    console.log(message);
                    assert.equal(message, "1");
                }
            };
            line.script(fakeTextMessageEvent);
        });
    });


});