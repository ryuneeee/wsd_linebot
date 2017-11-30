const assert = require('chai').assert;
const line = require('../routes/line');
const ScriptRunner = require('../scriptrunner/script');
const util = require("util");

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
            "text": "Hello, world"
        }
    };


    describe('Default', function(){
        it('Basic Event', function(){
            line.reply = function(message){
                console.log(message);
            };
            line.handleEvent(fakeTextMessageEvent)
        });
    });


});