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
        domain.once('error', (e) => {
            printError(e);
        });

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
        sandbox.reply(calcErrorLine(e));
    }
};


function hiddenFunction() {
    // toString overriding for prevent that user can seeing.
    return "You can't see function code."
}


function calcErrorLine(e) {
    // Printing request script error position of line.
    let msg = '';
    if (!e.stack.includes('evalmachine.<anonymous>')) {
        msg = e.message;

    }
    // else if (e.stack.includes('ReferenceError')) {
    //     let lines = e.stack.split('\n');
    //     msg = lines[0] + '\n';
    //     msg += '    at ' + lines[1].substring(lines[1].indexOf('('), lines[1].indexOf('>:') + 2);
    //     let sp = lines[1].substring(lines[1].indexOf('>:') + 2, lines[1].length - 1).split(':');
    //     msg += parseInt(sp[0]) - 2 + ':' + parseInt(sp[1]) + ')';
    //
    // }
    else {
        let lines = e.stack.split('\n');
        msg = '> ' + lines[1] + '\n\n';
        msg += lines[4] + '\n';
        msg += '    at (' + lines[0].substring(0, lines[0].indexOf('>:') + 2)
            + (parseInt(lines[0].substring(lines[0].indexOf('>:') + 2)) - 2) + ':' + lines[2].length + ')';
    }
    return msg;
}