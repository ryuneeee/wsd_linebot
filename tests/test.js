var assert = require('assert');

describe('ScriptRunner', function() {


    it('Basic script', function(){
        let scriptRunner = require('../scriptRunner/script');
        const sandbox = {reply: function(v){ result = v; }};
        scriptRunner(sandbox, 'reply(1);');

        assert.equal(result, 1);
        assert.notEqual(result, undefined);
    });
});