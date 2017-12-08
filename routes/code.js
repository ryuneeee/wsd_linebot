const express = require('express');
const router = express.Router();
const app = require('../app');
const Line = require('../scriptrunner/line');
const line = app.line;
const Code = require('../models/code-model');
const cronParser = require('cron-parser');

const BadRequest = require('../errors/error.400');
const Forbidden = require('../errors/error.403');
const InternalSE = require('../errors/error.500');

const testerLine = new Line();

// middleware
function isLogined(req, res, next) {
    let user = req.session.user || null;

    if (user === null)
        throw new Forbidden('not login');

    next();
}

function verifyCtxId(req, res, next) {
    let ctxId = req.params.id || null;

    if (ctxId === null)
        throw new BadRequest('no context id');

    if (/^[CRU]{1}[0-9a-f]{32}$/g.test(ctxId) == false)
        throw new BadRequest('illegal context id format');

    next();
}

function verifyCode(req, res, next) {
    let name = req.body.name || null;
    try {
        cronParser.parseExpression(req.body.interval);
        if(req.body.interval.trim() === '') req.body.interval = null;
    } catch (error) {
        throw new BadRequest('invalid interval structure');
    }
    let content = req.body.content || null;
    if (name === null) throw new BadRequest('no code name');
    if (content === null) throw new BadRequest('no code content');

    if (name === '') throw new BadRequest('empty code name');
    if (content === '') throw new BadRequest('empty code content');

    next();
}

function verifyCodeId(req, res, next) {
    let codeId = req.params.id || null;

    if (codeId === null)
        throw new BadRequest('no code id');

    if (/^[0-9a-f]{24}$/g.test(codeId) === false)
        throw new BadRequest('illegal code id format');

    next();
}

function verifyWriter(req, res, next) {

    /* double check.... (1) */

    let codeId = req.params.id || null;

    if (codeId === null)
        throw new BadRequest('no code id');

    if (/^[0-9a-f]{24}$/g.test(codeId) === false)
        throw new BadRequest('illegal code id format');

    /* double check.... (2) */

    if (req.session.user === undefined)
        throw new Forbidden('not login');

    Code.find({'_id': req.params.id}, 'writer', (err, result) => {
        if (err) next(new InternalSE(err));
        if (result[0].writer === req.session.user.id) {
            next();
        } else {
            next(new Forbidden('you are not writer of this code.'));
        }
    });

}


router.post('/codes/test', isLogined, (req, res, next) => {
    let result = [];
    let event = {
        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
        "type": "message",
        "timestamp": 1462629479859,
        "source": {
            "type": "user",
            "userId": "U9b01f7ca__sample__3b170bf928374"
        },
        "message": {
            "id": "325708",
            "type": "text",
            "text": req.body.input
        }
    };

    testerLine.getCodeByCtxId = (ctxId, f) => {
        let code = new Code();
        code.content = req.body.code;
        let codes = [];
        codes.push(code);
        f(codes);
    };

    testerLine.reply = message => {
        console.log("testing:" + message);
        result.push(message);
    };
    testerLine.script(event);

    //Wating for script execution time. Because script execution is asynchronous.
    setTimeout(function () {
        res.status(200).json({"message": result}).end();
    }, 1500);
});


// get code list by context id
router.get('/codes/:id', isLogined, verifyCtxId, (req, res, next) => {
    Code.find({'ctxId': req.params.id}, '_id name writer', (err, result) => {
        //if (err) throw new InternalSE(err);
        if (err) next(new InternalSE(err));
        let ret = [];
        result.forEach((ele, idx, err) => {
            ret.push({
                'id': ele['_id'],
                'name': ele['name'],
                'writer': ele['writer']
                /*'date': ele['date']*/
            });
        });
        res.json(ret).end();
    });
});

// get code by code id
router.get('/code/:id', isLogined, verifyCodeId, (req, res, next) => {
    Code.findOne({'_id': req.params.id}, (err, result) => {
        //if (err) throw new InternalSE(err);
        if (err) next(new InternalSE(err));
        let ret = {
            'id': result._id,
            'ctxId': result.ctxId,
            'writer': result.writer,
            'name': result.name,
            'interval': result.interval,
            'content': result.content,
            'date': result.date
        };
        res.json(ret).end();
    });
});

// insert code by context id
router.post('/code/:id', isLogined, verifyCtxId, verifyCode, (req, res, next) => {
    // insert one itme
    let c = new Code();
    c.ctxId = req.params.id;
    c.writer = req.session.user.id;
    c.name = req.body.name;
    c.interval = req.body.interval;
    c.content = req.body.content;
    //c.date = // default value

    c.save((err, result) => {
        if (err) next(new InternalSE(err));

        line.scriptJob(result);
        res.json({'result': 'success', 'message': [result.id]}).end();
    });
});

// update code by code id
router.put('/code/:id', isLogined, verifyCodeId, verifyCode, verifyWriter, (req, res, next) => {
    Code.findOneAndUpdate({'_id': req.params.id}, {
            'name': req.body.name,
            'interval': req.body.interval,
            'content': req.body.content,
            'date': Date.now()
        }, {new: true}, (err, result) => {
            if (err) next(new InternalSE(err));

            line.scriptJob(result);
            res.json({'result': 'success'}).end();
        }
    );
});

// delete code by code id
router.delete('/code/:id', isLogined, verifyCodeId, verifyWriter, (req, res, next) => {
    Code.findOne({'_id': req.params.id}, (err, result) => {
        if (err) next(new InternalSE(err));
        line.cancelJob(result.id);
        result.remove();
        res.json({'result': 'success'}).end();
    });
});

module.exports = router;
