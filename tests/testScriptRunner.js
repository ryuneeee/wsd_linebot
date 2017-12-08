const assert = require('chai').assert;
const ScriptRunner = require('../scriptrunner/script');

describe('ScriptRunner', function() {


    describe('Default', function(){
        it('Basic', function(){
            let runner = new ScriptRunner();
            runner.run("var ryun = 1;");
        });

        it("Can't find variable", function(){
            assert.throws(function(){
                let runner = new ScriptRunner();
                runner.run('ryun');
            }, "ryun is not defined");
        });
    });


    describe('Sandbox', function(){
        it('With sandbox', function () {
            let runner = new ScriptRunner();
            let sandbox = {};
            runner.run('var ryun = "hello";', sandbox);
            assert.equal(sandbox.ryun, 'hello');
        });

        it('With sandbox', function () {
            let result = 0;
            let sandbox = { reply: (v) => { result = v; } };
            let runner = new ScriptRunner();
            runner.run('reply("Ryun");', sandbox);
            assert.equal(result, "Ryun");
        });

        it('With sandbox2', function () {
            let runner = new ScriptRunner();
            let sandbox = {name: 'Ryunhee han'};
            runner.run('name = "Ryun";', sandbox);
            assert.equal(sandbox.name, 'Ryun');
        });

        it('Init ScriptRunner with sandbox', function(){
            let sandbox = {};
            let runner = new ScriptRunner(sandbox);
            runner.run('var ryun = "hello";');
            assert.equal(sandbox.ryun, 'hello');
        });

        it('Init ScriptRunner with sandbox2', function(){
            let sandbox = {};
            let runner = new ScriptRunner(sandbox);
            runner.run('var ryun = "hello";');
            assert.equal(sandbox.ryun, 'hello');
            runner.run('ryun = "world"');
            assert.equal(sandbox.ryun, 'world');
        });
    });


    describe('node require module', function(){
        it('require by whitelist throws error', function(){
            assert.throws(function(){
                let runner = new ScriptRunner();
                runner.setRequires([]);
                runner.run('require("util")');
            }, "You can't load unauthorized script.");
        });

        it('require by whitelist does not throws', function(){
            assert.doesNotThrow(function(){
                let runner = new ScriptRunner();
                runner.setRequires(['util']);
                runner.run('require("util");');
            });
        });
    });


    describe('throws error', function(){
        it('throw syntax error', function(){
            assert.throws(function(){
                let runner = new ScriptRunner();
                runner.run('require("util"');
            }, SyntaxError);
        });

        it('throw syntax error2', function(){
            assert.throws(function(){
                let runner = new ScriptRunner();
                runner.run('require("util")2');
            }, SyntaxError);
        });

        // // 사실상 직접적으로 테스트 할 방법이 없는걸로...
        // // https://github.com/chaijs/chai/issues/415
        // it('throws in user script callback', function(){
        //     assert.doesNotThrow(function(){
        //         let runner = new ScriptRunner();
        //         runner.setRequires(['request']);
        //         let code = `
        //             var request = require("request");
        //             request.get({url:'http://www.myunsay.net/sale'}, function (error, response, body) {
        //                 throw new Error("haha");
        //             });
        //         `;
        //         return runner.run(code);
        //     });
        // });
    });

    describe('Attack', function(){
        it('Prevent infinite loop', function(){
            assert.throws(function(){
                let runner = new ScriptRunner();
                runner.run('while(true){};');
            }, "Script execution timed out.")
        });

        it('Prevent see through require function', function(){
            let runner = new ScriptRunner();
            let sandbox = {};
            runner.run('var func = require.toString()', sandbox);
            assert.equal(sandbox.func, 'You can\'t see function code.')
        });
    });

});