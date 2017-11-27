const domain = require('domain').create();
const vm = require('vm');
const timeout = 1000;

module.exports = function (sandbox, code){
    if(sandbox === undefined) throw new Error('Script sandbox must be defined!');
    if(sandbox.reply === undefined) throw new Error('Script sandbox must have reply property!');

    sandbox.require = function (moduleName) {
        let whitelist = ['request', 'cheerio', 'iconv'];
        if (whitelist.includes(moduleName)) {
            return require(moduleName);
        } else {
            throw new Error("You can't load unauthorized script.");
        }
    };

    try {
        // http://programmingsummaries.tistory.com/375
        // register once
        if (domain._events.error === undefined) domain.on('error', (e) => { printError(e); });


        domain.run(function() {
            let sandbox = arguments[0];
            let code = arguments[1];

            Function.prototype.toString = hiddenFunction;
            let script = new vm.Script(code, { lineOffset: 1, displayErrors: true});
            script.runInNewContext(sandbox, {timeout: timeout});
            Function.prototype.toString = Object.prototype.toString;

        }, sandbox, code);
    } catch (e) {
        printError(e);
    }
    function printError(e) {
        Function.prototype.toString = Object.prototype.toString;
        sandbox.reply(e.message);
    }
};


function hiddenFunction() {
    // toString overriding for prevent that user can seeing.
    return "You can't see function code."
}