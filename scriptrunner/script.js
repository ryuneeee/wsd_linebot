const domain = require('domain').create();
const EventEmitter = require('events');
const vm = require('vm');
const schedule = require('node-schedule');


function hiddenFunction() {
    // toString overriding for prevent that user can seeing.
    return "You can't see function code."
}

class ScriptRunner extends EventEmitter {
    constructor(sandbox) {
        super();
        this.requires = [];
        this.sandbox = sandbox || {};
        this.timeout = 10000;
        this.map = new Map();
        this.contextId = 'default';
    }

    // whitelist module on scripting.
    setRequires(requires) {
        this.requires = requires;
    }

    setScriptTimeout(timeout){
        this.timeout = timeout;
    }

    setContextId(id) {
        this.contextId = id;
    }

    addJob(jobId, interval, func){
        schedule.scheduleJob(jobId, interval, func);
    }

    isRunningJob(jobId){
        return (schedule.scheduledJobs[jobId] !== undefined);
    }

    cancelJob(jobId){
        if(this.isRunningJob(jobId)) {
            schedule.scheduledJobs[jobId].cancel();
        }
    }

    run(code, sandbox){
//        Function.prototype.toString = hiddenFunction;
        try {
            this.sandbox = this._wrappingSandbox(sandbox);
            let script = new vm.Script(code, {lineOffset: 1, displayErrors: true});

            // If you want to change 'once' events: https://stackoverflow.com/questions/12150540/javascript-eventemitter-multiple-events-once
            if (domain._events.error === undefined){
                domain.on('error', (error) => {
                    (this._events.error !== undefined) ? this.emit('error', error, this.sandbox) : console.error(error);
                });
            }

            domain.run(()=> {
                script.runInNewContext(sandbox, {timeout: this.timeout});
//                Function.prototype.toString = Object.prototype.toString;
            });
        } catch (error) {
            if(this._events.error !== undefined) this.emit('error', error, this.sandbox); else throw error;
        } finally {
//            Function.prototype.toString = Object.prototype.toString;
        }
    }

    _wrappingSandbox(sandbox) {
        if (sandbox !== undefined && sandbox.require === undefined)
            sandbox.require = this._wrappingRequire(this.requires);
        if (sandbox !== undefined && sandbox.ctx === undefined)
            sandbox.ctx = this._wrappingContext(this.map, this.contextId);
	sandbox.console = console;
        return sandbox;
    }

    _wrappingRequire(requires){
        return function(moduleName) {
            if (requires.includes(moduleName)) return require(moduleName);
            else throw new Error("You can't load unauthorized script.");
        };
    }

    _wrappingContext(_map, ctxId){
        if (!_map.has(ctxId)) {
            _map.set(ctxId, new Map());
        }
        return _map.get(ctxId);
    }
}

module.exports = ScriptRunner;
