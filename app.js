const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

//express
const express = require('express');
const app = express();

//line bot & vm
const line = require('@line/bot-sdk');
const client = new line.Client(config);
const vm = require('vm');
const timeout = 1000;

//line bot webhook
app.post('/webhook', line.middleware(config), (req, res) => {
    res.json(req.body.events.map(handleEvent))
});

// parser & view engine setup
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//express router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// toString overriding for prevent that user can seeing.
Function.prototype.toString = function(){
    return "You can't see function code."
};

// require module wrapper
const whiteRequire = function(moduleName){
    let whitelist = ['http'];
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
        try {
            const script = new vm.Script(code);
            script.runInNewContext(sandbox, {timeout: timeout, displayErrors: true});
        } catch (e) {
            client.replyMessage(event.replyToken, { type: 'text', 'text': e.message});
        }
    }
}

module.exports = app;
